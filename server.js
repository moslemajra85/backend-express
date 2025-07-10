require("dotenv").config();
const colors = require("colors");
const express = require("express");
const connectDB = require("./config/index");
const app = express();

const { getCourses, fetchCourses } = require("./DB_Operations/index");

connectDB();

//getCourses();
fetchCourses();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `Server is running on port ${port} in ${process.env.NODE_ENV} mode...`
      .bgBlue
  );
});
