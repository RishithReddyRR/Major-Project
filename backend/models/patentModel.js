const mongoose=require("mongoose");

const patentSchema=new mongoose.Schema({
    patentId:Number,
    title:String,
    inventors:[{type:mongoose.Schema.ObjectId, ref: "user"}],
    applicantNames:[String],
    patentHolder:String,
    patentNumber:Number,
    filingDate:Date,
    publishDate:Date,
    grantDate:Date,
    abstract:String,
    keywords:[String],
    patentOffice:String,
    doi:Date,
    fullText:String,
    patentStatus:String,
    year:String,
    month:String,
    academicYear:String,
    comments:[String]
})

module.exports=mongoose.model("Patent",patentSchema);