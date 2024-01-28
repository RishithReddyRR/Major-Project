const { asyncErrorHandler } = require("../middleware/catchAsyncError");
const user = require("../models/userModel");
const ErrorHandler=require('../utils/errorHandler')
const sendToken=require('../utils/jwttoken')
const {sendEmail}=require('../utils/sendEmail.js')
const crypto=require('crypto')
const cloudinary=require("cloudinary")
const cheerio=require("cheerio")
const axios=require("axios")
require('dotenv').config({
    path:"../config/.env"
})
//creating a use
exports.createUser = asyncErrorHandler(async (req, res, next) => {
  // const myCloud= await cloudinary.v2.uploader.upload(req.body.avatar,{
  //   folder:"avatars",
  //   width:150,
  //   crop:"scale"
  // }) 
  // const { name, email, password } = req.body;
  // const u=await user.create({
  //   name,
  //   email,
  //   password,
  //   avatar:{
  //     public_id:myCloud.public_id,
  //     url:myCloud.secure_url
  // }
  // });
  const u=await user.create(req.body);
  sendToken(u,200,res);
});

//user login

exports.userLogin=asyncErrorHandler(async(req,res,next)=>{
    const {email,password}=req.body

    //checing if both email and password are entered
    if(!email||!password){
        return next(new ErrorHandler("enter both email and password",400))
    }

    const u=await user.findOne({email}).select("+password")
    if(!u){
        return next(new ErrorHandler("no user exist with this credentials","404"))
    }

    const isPasswordMatched=await u.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("password is incorrect",401))
    }

    sendToken(u,200,res);

})



//logout user
exports.logout=asyncErrorHandler(async(req,res,next)=>{
    res.clearCookie("token").status(200).json({
      success:true,
      message:"Logged Out"
    })
  })


  //generating password change token
  exports.forgotPassword=asyncErrorHandler(async (req,res,next)=>{
    const {email}=req.body
    const u=await user.findOne({email})
    if(!u){
        return next(new ErrorHandler("user doesn't exist",404))
    }
    const resetToken=u.getResetPasswordToken()
    //in getResetPasswordToken  some thing is assigned to model document but not saved so
    await u.save({validateBeforeSave:false})

    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/user/pass_reset/${resetToken}`
    const message=`Your password reset token is:-\n\n ${resetPasswordUrl}\n\nif you didn't requested for password change neglect this mail`
    try{
        await sendEmail({
            email,
            subject:"password reset",
            message
        })
        res.status(200).json({
            success:true,
            message:`email sent to ${email} successfully`
        })

    }
    catch(error){
        u.resetPasswordToken=undefined
        u.resetPasswordExpire=undefined
        await u.save({validateBeforeSave:false})

        return next(new ErrorHandler(error.message,500))

    }

  })

  // Reset Password
exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
  
    const u = await user.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });
  
    if (!u) {
      return next(
        new ErrorHandler(
          "Reset Password Token is invalid or has been expired",
          400
        )
      );
    }
  
    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not password", 400));
    }
  
    u.password = req.body.password;
    u.resetPasswordToken = undefined;
    u.resetPasswordExpire = undefined;
    await u.save();
  
    sendToken(u, 200, res);
  });


  //get user details

  exports.getUserDetails=asyncErrorHandler(async (req,res,next)=>{
    res.status(200).json({
        success:true,
        user:req.user
    })
  })

  //update password
exports.updatePassword=asyncErrorHandler(async(req,res,next)=>{
    const u = await user.findById(req.user.id).select("+password");
    const isPasswordMatched = await u.comparePassword(req.body.oldPassword);
    console.log(1)
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    console.log(2)
    if(req.body.newPassword!==req.body.confirmPassword){
      return next(new ErrorHandler("old password is incorrect",400))
    }
    console.log(3)
    u.password=req.body.newPassword
    await u.save()
    sendToken(u,200,res)
  })

  //update profile
  exports.updateProfile=asyncErrorHandler(async(req,res,next)=>{
    const newprofile={
        name:req.body.name,
        email:req.body.email
    }
    //
    const u=await user.findByIdAndUpdate(req.user.id,newprofile,{
        new:true,
        runValidators:true,
        useFindAndModify:false

    })
    res.status(200).json({
        success:true,
        user:u
    })

  })

  //update pass(to be deleted later)
  exports.temp=asyncErrorHandler(async(req,res)=>{
    const u=await user.findOne({name:"Gunupudi Rajesh Kumar"})
    u.password="rajesh sir"
    await u.save()
    res.status(200).json({
      success:true
    })
  })
  //scrap the details
  exports.scrapDetails=asyncErrorHandler(async(req,res)=>{
    const gsUrl=req.user.gsProfile
    const wosUrl=req.user.wosProfile
    const scopusUrl=req.user.scopusProfile
    const vidwanUrl=req.user.vidwanProfile
    //scrap google scholar 
    let response= await axios.get(gsUrl)
    let data=response.data
    let $ = cheerio.load(data);
    ele=$('.gsc_rsb_std')
    // console.log($(ele[0]).text())
    // console.log($(ele[2]).text())
    const gsCitations=$(ele[0]).text()
    const gsHIndex=$(ele[2]).text()
   //scrap vidwan
   response=await axios.get(vidwanUrl)
   data=response.data
   $=cheerio.load(data)
   const vidwanScore=$("span.pull-right").text()
   console.log(vidwanScore)
   //scrapping scopus
   let config={
    headers: {
      "method":"GET",
      "scheme":"https",
      "accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "accept-encoding":"gzip, deflate, sdch, br",
      "accept-language":"en-US,en;q=0.8",
      "cache-control":"no-cache",
      "pragma":"no-cache",
      "referer":"https://www.google.com/",
      "upgrade-insecure-requests":"1",
      "user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36"
    }
  }
   response=await axios.get(scopusUrl,config)
   console.log(response.data)

    res.json({
      success:true
    })
  })
  
  
