const { asyncErrorHandler } = require("../middleware/catchAsyncError");
const journal = require("../models/journalModel");
const conference = require("../models/conferenceModel");
const bookChapter = require("../models/bookChapterModel");
const publication = require("../models/publicationModel");
const ApiFeatures = require("../utils/apiFeatures");
//user publication details

exports.getPublicationsOfUser = asyncErrorHandler(async (req, res, next) => {
  const { name } = req.body;
  const resultPerPage = 10;
  // console.log(req.body)
  // const journals=await journal.find({nameOfAuthor:name})
  // const conferences=await conference.find({nameOfAuthor:name})
  // const bookChapters=await bookChapter.find({nameOfAuthor:name})
  // console.log(journals)
  const currentPage = Number(req.query.page) || 1;

  const skip = resultPerPage * (currentPage - 1);
  let publications = await publication.find({ nameOfAuthor: name });
  let publicationsCount = publications.length;
  let tPub = [...publications];
  publications = await publication
    .find({ nameOfAuthor: name })
    .limit(resultPerPage)
    .skip(skip);
  let tempP;
  let countArray = [];
  tempP = await publication.find({
    nameOfAuthor: name,
    typeOfPublication: {
      $regex: "journal",
      $options: "i",
    },
  });
  countArray.push(tempP.length);
  tempP = await publication.find({
    nameOfAuthor: name,
    typeOfPublication: {
      $regex: "book chapter",
      $options: "i",
    },
  });
  countArray.push(tempP.length);
  tempP = await publication.find({
    nameOfAuthor: name,
    typeOfPublication: {
      $regex: "conference",
      $options: "i",
    },
  });
  countArray.push(tempP.length);
  tempP = await publication.find({
    nameOfAuthor: name,
    typeOfPublication: {
      $regex: "patent",
      $options: "i",
    },
  });
  countArray.push(tempP.length);
  tempP = await publication.find({
    nameOfAuthor: name,
    typeOfPublication: {
      $regex: "copyright",
      $options: "i",
    },
  });
  countArray.push(tempP.length);

  //year wise count
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const yearCount = [];
  for (let i = 0; i < 15; i++) {
    const x = await publication.find({
      nameOfAuthor: name,
      year: currentYear - i,
    });
    let ob = {
      year: currentYear - i,
      count: x.length,
    };
    yearCount.unshift(ob);
  }
  //year wise count
  const yearCitationsCount = [];
  for (let i = 0; i < 15; i++) {
    const x = await publication.find({
      nameOfAuthor: name,
      year: currentYear - i,
    });
    let c=0
    x.forEach(ele=>c+=ele.noOfCitations)
    let ob = {
      year: currentYear - i,
      count:c,
    };
    yearCitationsCount.unshift(ob);
  }
  // console.log(publications)
  res.status(200).json({
    success: "true",
    publications,
    publicationsCount,
    resultPerPage,
    tPub,
    countArray,
    yearCount,
    yearCitationsCount,
  });
});

//get publications

exports.getPublications = asyncErrorHandler(async (req, res, next) => {
  const resultPerPage = req.query.ppp;
  const publicationsCount = await publication.countDocuments();
  const apiFeatures = new ApiFeatures(publication.find(), req.query)
    .search()
    .filter();
  let pub = await apiFeatures.query;
  let filteredPublicationsCount = pub.length;
  // const pubJ=await apiFeatures.queryJ
  // const pubC=await apiFeatures.queryC
  // const pub=[...pubB,...pubJ,...pubC]
  const tPub = [...pub];
  apiFeatures.pagination(resultPerPage);
  pub = await apiFeatures.query.clone();
  res.status(200).json({
    success: true,
    publications: pub,
    publicationsCount,
    resultPerPage,
    filteredPublicationsCount,
    tPub,
  });
});

//get publications for home page
exports.getPublicationHome = asyncErrorHandler(async (req, res, next) => {
  const publications = await publication.find({}).limit(8);
  res.status(200).json({
    success: true,
    publications,
  });
});

//get publication details

exports.getPublicationDetails = asyncErrorHandler(async (req, res, next) => {
  const publicationDetails = await publication.findById(req.params.id);
  res.status(200).json({
    success: true,
    publicationDetails,
  });
});

//get publications counts for @admin

exports.getPublicationsAdmin = asyncErrorHandler(async (req, res, next) => {
  const pub = await publication.find({});
  const publicationsCount = pub.length;
  let countArray = [];
  tempP = await publication.find({
    typeOfPublication: {
      $regex: "journal",
      $options: "i",
    },
  });
  countArray.push(tempP.length);
  tempP = await publication.find({
    $or: [
      {
        typeOfPublication: {
          $regex: "book chapter",
          $options: "i",
        },
      },
      {
        typeOfPublication: {
          $regex: "bookchapter",
          $options: "i",
        },
      },
    ],
  });
  countArray.push(tempP.length);
  tempP = await publication.find({
    typeOfPublication: {
      $regex: "conference",
      $options: "i",
    },
  });
  countArray.push(tempP.length);
  tempP = await publication.find({
    typeOfPublication: {
      $regex: "patent",
      $options: "i",
    },
  });
  countArray.push(tempP.length);
  tempP = await publication.find({
    typeOfPublication: {
      $regex: "copyright",
      $options: "i",
    },
  });
  countArray.push(tempP.length);
  //year wise count
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const yearCount = [];
  for (let i = 0; i < 15; i++) {
    const x = await publication.find({ year: currentYear - i });
    let ob = {
      year: currentYear - i,
      count: x.length,
    };
    yearCount.unshift(ob);
  }
  const yearCountEach = [];
  for (let i = 0; i < 10; i++) {
    const cJ = await publication.find({
      $and: [
        { year: currentYear - i },
        {
          typeOfPublication: {
            $regex: "journal",
            $options: "i",
          },
        },
      ],
    });
    const cB = await publication.find({
      $and: [
        { year: currentYear - i },
        {
          typeOfPublication: {
            $regex: "Book chapter",
            $options: "i",
          },
        },
      ],
    });
    const cC = await publication.find({
      $and: [
        { year: currentYear - i },
        {
          typeOfPublication: {
            $regex: "conference",
            $options: "i",
          },
        },
      ],
    });
    const cP = await publication.find({
      $and: [
        { year: currentYear - i },
        {
          typeOfPublication: {
            $regex: "patent",
            $options: "i",
          },
        },
      ],
    });
    const cCR = await publication.find({
      $and: [
        { year: currentYear - i },
        {
          typeOfPublication: {
            $regex: "copyright",
            $options: "i",
          },
        },
      ],
    });
    let ob = {
      year: currentYear - i,
      countJ: cJ.length,
      countB: cB.length,
      countC: cC.length,
      countP: cP.length,
      countCR: cCR.length,
    };
    yearCountEach.unshift(ob);
  }
  res.status(200).json({
    success: true,
    // publications: pub,
    publicationsCount,
    countArray,
    yearCount,
    yearCountEach,
  });
});

//delete publication @admin
exports.deletePublication = asyncErrorHandler(async (req, res, next) => {
  const publicationDetails = await publication.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    // publicationDetails,
  });
});
//delete all publication @admin
exports.deleteAllPublication = asyncErrorHandler(async (req, res, next) => {
  await publication.deleteMany();
  const publications = await publication.find({});
  res.status(200).json({
    success: true,
    publications,
  });
});
//update publication @admin
exports.updatePublication = asyncErrorHandler(async (req, res, next) => {
  await publication.findByIdAndUpdate(req.params.id, req.body);
  const publicationDetails = await publication.findById(req.params.id);
  // console.log(req.body)
  res.status(200).json({
    success: true,
    publicationDetails,
  });
});
