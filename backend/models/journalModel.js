const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  nameOfAuthor: {
    type: String,
    // ref: "user",
    // required: [true, "please enter name of author"],
  },
  listOfAuthors: [{ 
    // type: mongoose.Schema.ObjectId, ref: "user" 
    type:String
  }],
  studentPublication: {
    type: String,
    default: "no",
  },
  title: {
    type: String,
  },
  journalName: {
    type: String,
    // required: [true, "enter journal name"],
  },
  scopus: {   type: String,
    default: "no", },
  wos: {   type: String,
    default: "no",},
  publisherName: String,
  publicationDetails:{
   type:String
  }
  ,
  year: String,
  month: String,
  academicYear: String,
  url: {
    type:String,
    // required: [true, "url of your publication is required"]
  },
  doi:String,
  ISSN:String,
  journalHomePage:String,
  indexingDetails:String,
  noOfCitations:{
    type:Number,
    default:0
  },
  abstract:{
    type:String,
    // required:[true,"enter abstract"]
  },
  keywords:[String],
  specialization:String,
  status:{
    type:String,
    // enum:["active","inactive"]
  },
  clarivateImpactFactor:{
    type:Number,
    default:0
  },
  JCRScore:Number,
  hIndex:Number,
  comments:[String]
});


module.exports=mongoose.model("Journal",journalSchema)
