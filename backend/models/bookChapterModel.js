const mongoose = require("mongoose");

const bookChapterSchema = new mongoose.Schema({
  nameOfAuthor: {
    // type: mongoose.Schema.ObjectId,
    // ref: "user",
    // required: [true, "please enter name of author"],
    type:String
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
  conferenceName: {
    type: String,
    // required: [true, "enter conference name"],
  },
  conferenceLocation: {
    country: {
      type: String,
    },
    city: String,
    venue: String,
  },
  conferenceOrganizer: String,
  scopus: {  type: String,
    default: "no", },
  wos: {  type: String,
    default: "no", },
  publisherName: String,
  publicationDetails: {
    type:String
  },
  year: String,
  month: String,
  academicYear: String,
  url: {
    type: String,
    // required: [true, "url of your publication is required"],
  },
  doi: String,
  ISBN: String,
  indexingDetails: String,
  noOfCitations: {
    type: Number,
    default: 0,
  },
  abstract: {
    type: String,
    // required: [true, "enter abstract"],
  },
  keywords: [String],
  specialization: String,
  status: {
    type: String,
    // enum: ["active", "inactive"],
  },
  comments: [String],
});

module.exports = mongoose.model("BookChapter", bookChapterSchema);
