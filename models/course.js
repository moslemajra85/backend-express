const mongoose = require("mongoose");

// create The course Schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now,
  },
  isPublished: Boolean,
  price: Number,
});

// create Course Model
const Course = mongoose.model("Course", courseSchema);

module.exports = Course;


