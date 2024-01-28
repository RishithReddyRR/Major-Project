const mongoose = require("mongoose");
const conferenceSchema = new mongoose.Schema({
  nameOfAuthor: {
    type: String,
    // type: mongoose.Schema.ObjectId,
    // ref: "user",
    // required: [true, "please enter name of author"],
  },
  // listOfAuthors: [{ type: mongoose.Schema.ObjectId, ref: "user" }],
  listOfAuthors: [{ type: String }],
  studentPublication: {
    type: String,
    default: "no",
  },
  title: {
    type: String,
    unique:true
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
  scopus: { type: String, default: "no" },
  wos: { type: String, default: "no" },
  publisherName: String,
  publicationDetails: String,
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
    default: "",
  },
  keywords: [String],
  specialization: String,
  status: {
    type: String
  },
  comments: [String],
});

module.exports = mongoose.model("conference", conferenceSchema);
