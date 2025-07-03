const express = require("express");
let courses = require("./data/courses");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello From Moslem!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  courses.push({
    id: courses.length + 1,
    ...req.body,
  });

  res.send(courses[courses.length - 1]);
});

app.put("/api/courses/:id", (req, res) => {
  // extract the id from the request params

  const id = +req.params.id;

  // look for the courses with the extracted

  let course = courses.find((course) => course.id === id);

  if (!course) {
    res.send(`We could not find course with id = ${id}`);
    return;
  }
  // update the course
  courses = courses.map((course) =>
    course.id === id ? { ...course, ...req.body } : course
  );

  // send response back
  const updatedCourse = courses.find((course) => course.id === id);

  res.send(updatedCourse);
});

app.delete("/api/courses/:id", (req, res) => {
  // extract the id from the request params
  const id = +req.params.id;

  // look for the courses with the extracted
  let course = courses.find((course) => course.id === id);

  if (!course) {
    return res.send(`We could not find course with id = ${id}`);
  }

  courses = courses.filter((course) => course.id !== id);

  res.send(course);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});
