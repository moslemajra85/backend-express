require("dotenv").config();
const colors = require("colors");
const express = require("express");
const connectDB = require("./config/index");
const Course = require("./models/course");
const { difference } = require("lodash");

const app = express();
connectDB();

async function createCourses() {
  try {
    const result = await Course.insertMany([
      {
        name: "React - The Complete Guide",
        author: "Adam Smith",
        tags: ["Frontend", "JavaScript", "Library"],
        isPublished: true,
        price: 30.99,
      },
      {
        name: "Node.js - The Complete Guide",
        author: "Maximilian Schwarzmüller",
        tags: ["Backend", "JavaScript", "Runtime"],
        isPublished: true,
        price: 15.0,
      },
      {
        name: "Angular - The Complete Guide",
        author: "Maximilian Schwarzmüller",
        tags: ["Frontend", "JavaScript", "Framework"],
        isPublished: false,
        price: 20.0,
      },
      {
        name: "MongoDB - The Complete Developer's Guide",
        author: "Stephen Grider",
        tags: ["Backend", "Database", "NoSQL"],
        isPublished: true,
        price: 10.0,
      },
    ]);
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

async function getCourses() {
  try {
    // const courses = await Course.find();

    // const courses = await Course.find({
    //   tags: "Frontend",
    // });

    // const course = await Course.find({
    //   _id: "686e3cc378551b4672470f7f",
    // });

    const course = await Course.findById("686e3cc378551b4672470f7f");

    if (!course) {
      console.log("Course was not found!".bgRed);
      return;
    }

    console.log(course);
  } catch (error) {
    console.error(error.message);
  }
}

async function findCourses(criteria) {
  try {
    const courses = await Course.find(criteria);

    console.log(courses);
  } catch (error) {
    console.error(error.message);
  }
}

async function deleteCourse(id) {
  try {
    const result = await Course.findByIdAndDelete(id);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

async function removeCourse(criteria) {
  try {
    const result = await Course.findOneAndDelete(criteria);
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

// async function updateCoursePrice(courseId, newPrice) {
//   try {
//     const course = await Course.findById(courseId);

//     if (!course) {
//       console.log("Course Was not found".bgBlue);
//       return;
//     }

//     // course.price = newPrice;
//     // course.isPublished = false;

//     course.set({
//       price: newPrice,
//       isPublished: false,
//     });
//     await course.save();
//   } catch (error) {
//     console.error(error.message);
//   }
// }

//createCourses();

// findCourses({
//   price: {
//     $gte: 20,
//   },
// });

//updateCoursePrice("686e4ba4d233c5a566844ba2", 30);
async function updateCourse(id, updatedData) {
  try {
    const result = await Course.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          ...updatedData,
        },
      }
    );

    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

updateCourse("686e4ba4d233c5a566844ba2", {
  name: "C++",
  author: "Moslem Ajra",
  price: 20,
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `Server is running on port ${port} in ${process.env.NODE_ENV} mode...`
      .bgBlue
  );
});
