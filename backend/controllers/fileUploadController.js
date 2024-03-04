const { asyncErrorHandler } = require("../middleware/catchAsyncError");
const csv = require("csvtojson");
// const Conference=require("../models/conferenceModel")
// const Journal=require("../models/journalModel")
// const BookChapter=require("../models/bookChapterModel")
const Publication = require("../models/publicationModel");
// //upload conference to database
// exports.uploadConferences=asyncErrorHandler(async (req,res)=>{

//     csv()
//     .fromFile(req.file.path)
//     .then((response)=>{
//         console.log(response)
//         response.forEach((item)=>{
//             item["listOfAuthors"]=item["listOfAuthors"].split(",")
//             item["keywords"]=item["keywords"].split(",")
//         })
//         Conference.insertMany(response)
//         // for(let i=0;i<response.length;i++){
//         //     ({name,age,branch}=response[i])
//         // }
//     })
//     res.status(200).send({
//         msg:"success",
//         success:true
//     })
// })
// exports.uploadJournals=asyncErrorHandler(async (req,res)=>{

//     csv()
//     .fromFile(req.file.path)
//     .then((response)=>{
//         console.log(response)
//         response.forEach((item)=>{
//             item["listOfAuthors"]=item["listOfAuthors"].split(",")
//             item["keywords"]=item["keywords"].split(",")
//         })
//         Journal.insertMany(response)
//         // for(let i=0;i<response.length;i++){
//         //     ({name,age,branch}=response[i])
//         // }
//     })
//     res.status(200).send({
//         msg:"success",
//         success:true
//     })
// })
// exports.uploadBookChapter=asyncErrorHandler(async (req,res)=>{

//     csv()
//     .fromFile(req.file.path)
//     .then((response)=>{
//         console.log(response)
//         response.forEach((item)=>{
//             item["listOfAuthors"]=item["listOfAuthors"].split(",")
//             item["keywords"]=item["keywords"].split(",")
//         })
//         BookChapter.insertMany(response)
//         // for(let i=0;i<response.length;i++){
//         //     ({name,age,branch}=response[i])
//         // }
//     })
//     res.status(200).send({
//         msg:"success",
//         success:true
//     })
// })
//upload publications
exports.uploadPublications = asyncErrorHandler(async (req, res) => {
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  let monthMap = new Map();
  for (let i = 0; i < months.length; i++) {
    monthMap.set(months[i], i + 1);
  }
  csv()
    .fromFile(req.file.path)
    .then((response) => {
      // console.log(response)
      response.forEach((item) => {
        item["listOfAuthors"] = item["listOfAuthors"].split(",");
        item["keywords"] = item["keywords"].split(",");
        const x=item.dateOfPublication.split("-")
        // console.log(x)
        item.date = `${x[2]}-${x[1]}-${x[0]}`;
        item["dateOfPublication"] = new Date(item.dateOfPublication).getTime();
        // console.log(item.dateOfPublication)
        if (isNaN(item.dateOfPublication)) {
          // console.log(`${item.year}--${item.month}`)
          item.dateOfPublication = 0;
        }
      });
      response.sort((a, b) => b.noOfCitations - a.noOfCitations);
      Publication.insertMany(response);
      // for(let i=0;i<response.length;i++){
      //     ({name,age,branch}=response[i])
      // }
    });
  res.status(200).send({
    msg: "success",
    success: true,
  });
});
