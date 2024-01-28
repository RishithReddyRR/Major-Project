const { asyncErrorHandler } = require("../middleware/catchAsyncError");
const csv=require('csvtojson')
const Conference=require("../models/conferenceModel")
const Journal=require("../models/journalModel")
const BookChapter=require("../models/bookChapterModel")
const Publication=require("../models/publicationModel")
//upload conference to database
exports.uploadConferences=asyncErrorHandler(async (req,res)=>{

    csv()
    .fromFile(req.file.path)
    .then((response)=>{
        console.log(response)
        response.forEach((item)=>{
            item["listOfAuthors"]=item["listOfAuthors"].split(",")
            item["keywords"]=item["keywords"].split(",")            
        })
        Conference.insertMany(response)
        // for(let i=0;i<response.length;i++){
        //     ({name,age,branch}=response[i])
        // }
    })
    res.status(200).send({
        msg:"success",
        success:true
    })
})
exports.uploadJournals=asyncErrorHandler(async (req,res)=>{

    csv()
    .fromFile(req.file.path)
    .then((response)=>{
        console.log(response)
        response.forEach((item)=>{
            item["listOfAuthors"]=item["listOfAuthors"].split(",")
            item["keywords"]=item["keywords"].split(",")            
        })
        Journal.insertMany(response)
        // for(let i=0;i<response.length;i++){
        //     ({name,age,branch}=response[i])
        // }
    })
    res.status(200).send({  
        msg:"success",
        success:true
    })
})
exports.uploadBookChapter=asyncErrorHandler(async (req,res)=>{

    csv()
    .fromFile(req.file.path)
    .then((response)=>{
        console.log(response)
        response.forEach((item)=>{
            item["listOfAuthors"]=item["listOfAuthors"].split(",")
            item["keywords"]=item["keywords"].split(",")            
        })
        BookChapter.insertMany(response)
        // for(let i=0;i<response.length;i++){
        //     ({name,age,branch}=response[i])
        // }
    })
    res.status(200).send({  
        msg:"success",
        success:true
    })
})
//upload publications
exports.uploadPublications=asyncErrorHandler(async (req,res)=>{

    csv()
    .fromFile(req.file.path)
    .then((response)=>{
        console.log(response)
        response.forEach((item)=>{
            item["listOfAuthors"]=item["listOfAuthors"].split(",")
            item["keywords"]=item["keywords"].split(",")            
        })
        Publication.insertMany(response)
        // for(let i=0;i<response.length;i++){
        //     ({name,age,branch}=response[i])
        // }
    })
    res.status(200).send({  
        msg:"success",
        success:true
    })
})