const mongoose=require("mongoose");

const copyrightSchema=new mongoose.Schema({
    copyrightId:Number,
    title:String,
    inventors:[{type:mongoose.Schema.ObjectId, ref: "user"}],
    applicantNames:[String],
    copyrightHolder:String,
    copyrightNumber:Number,
    dateOfRegistration:Date,
    filingDate:Date,
    publishDate:Date,
    grantDate:Date,
    abstract:String,
    keywords:[String],
    copyrightGrantingAuthority:String,
    doi:Date,
    fullText:String,
    copyrightStatus:String,
    year:String,
    month:String,
    academicYear:String,
    comments:[String]
})

module.exports=mongoose.model("Copyright",copyrightSchema);