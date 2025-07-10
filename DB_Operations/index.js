const courses = require("../fake/data");
const Course = require("../models/course");
const colors = require("colors");

async function createCourses() {
  try {
    const result = await Course.insertMany(courses);
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}

async function fetchCourses() {
  try {
    //  get all the courses that has an author name starting with "max"

    //const courses = await Course.find({ author: /^max/i });
    //const courses = await Course.find({ author: /grider$/i });

    const courses = await Course.find({ name: /.*adv.*/i });

    console.log(courses);
  } catch (error) {
    console.error(error.message);
  }
}

fetchCourses();
//createCourses();
async function getCourses() {
  try {
    const courses = await Course.find()
      .limit(5)
      .sort({
        price: 1,
      })
      .select({
        name: 1,
        author: 1,

        _id: 0,
      });

    // const courses = await Course.find({
    //   tags: "Frontend",
    // });

    // const course = await Course.find({
    //   _id: "686e3cc378551b4672470f7f",
    // });

    // const course = await Course.findById("686e3cc378551b4672470f7f");

    // if (!course) {
    //   console.log("Course was not found!".bgRed);
    //   return;
    // }

    console.log(courses);
  } catch (error) {
    console.error(error.message);
  }
}

//getCourses();
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

async function updateCoursePrice(courseId, newPrice) {
  try {
    const course = await Course.findById(courseId);

    if (!course) {
      console.log("Course Was not found".bgBlue);
      return;
    }

    // course.price = newPrice;
    // course.isPublished = false;

    course.set({
      price: newPrice,
      isPublished: false,
    });
    await course.save();
  } catch (error) {
    console.error(error.message);
  }
  // }

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
}

module.exports = {
  createCourses,
  fetchCourses,
  getCourses,
  findCourses,
  deleteCourse,
  removeCourse,
  updateCoursePrice,
 };