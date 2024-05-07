const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month starts from 0
const day = String(currentDate.getDate()).padStart(2, "0");

const date = new Date(year, month, day);

console.log(date);


dates = [
  "2024-05-06"
]