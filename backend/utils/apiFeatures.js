class ApiFeatures {
    constructor(query,queryStr) {
      this.query = query;
    
      this.queryStr = queryStr;
    }
  
    search() {
      const keyword = this.queryStr.keyword
        ? {$or:[{listOfAuthors: {
            $regex: this.queryStr.keyword,
            $options: "i",
          }},
          {title: {
            $regex: this.queryStr.keyword,
            $options: "i",
          }},
          {keywords: {
            $regex: this.queryStr.keyword,
            $options: "i",
          }},
          {typeOfPublication: {
            $regex: this.queryStr.keyword,
            $options: "i",
          }},
          {abstract: {
            $regex: this.queryStr.keyword,
            $options: "i",
          }},
        ]}
        : {};
      // console.log(keyword)
      this.query = this.query.find({ ...keyword });
      // this.queryC = this.queryC.find({ ...keyword });
      // this.queryJ = this.queryJ.find({ ...keyword });
      return this;
    }
  
    filter() {
      this.query=this.query.find({
        typeOfPublication:{
          $regex:this.queryStr.typeOfPublication,
          $options:"i"
        },
          noOfCitations:{
            $gte:this.queryStr.citations.gte,
            $lte:this.queryStr.citations.lte
          },
          year:{
            $gte:this.queryStr.fYear,
            $lte:this.queryStr.tYear
          },
          month:{
            $regex:this.queryStr.fMonth
          }
      })
      return this;
    }
  
    pagination(resultPerPage) {
      const currentPage = Number(this.queryStr.page) || 1;
  
      const skip = resultPerPage * (currentPage - 1);
      this.query = this.query.limit(resultPerPage).skip(skip);
  
      return this;
    }
  }
  
  module.exports = ApiFeatures;