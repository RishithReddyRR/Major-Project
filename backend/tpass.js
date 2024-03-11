let arr = "2016/5".split("/");
const monthDictionary = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};
let publication = {};
if (arr.length == 0) {
  publication.dateOfPublication = "1970-01-01";
  publication.month = monthDictionary[1];
  publication.year = "1970";
} else if (arr.length == 1) {
  publication.dateOfPublication = `${arr[0]}-01-01`;
  publication.month = monthDictionary[1];
  publication.year = arr[0];
} else if (arr.length == 2) {
  publication.dateOfPublication = `${arr[0]}-${
    Number(arr[1]) < 10 ? `0${arr[1]}` : arr[1]
  }-01`;
  publication.month = monthDictionary[Number(arr[1])];
  publication.year = arr[0];
} else {
  if (Number(arr[1]) < 10) {
    arr[1] = `0${arr[1]}`;
  }
  if (Number(arr[2]) < 10) {
    arr[2] = `0${arr[2]}`;
  }
  publication.dateOfPublication = arr.join("-");
}
console.log(publication.dateOfPublication);
