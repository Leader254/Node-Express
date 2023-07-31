const express = require("express");
const data = require("./data/mock.js");

const app = express();
const PORT = 8080;
app.use(express.json());

// Using the public folder
app.use(express.static("public"));

// Using the images folder
app.use("/images", express.static("images"));

// // /// /// /// // ROUTES /// /// /// /// //
//Get
app.get("/", (req, res) => {
  res.json(data);
});

// Route handlers with next()
app.get(
  "/next",
  (req, res, next) => {
    console.log("This is the first middleware");
    next();
  },
  (req, res) => {
    res.send("I am the second handler");
  }
);

// Get with download response method
app.get("/download", (req, res) => {
  res.download("images/mountains_2.jpeg");
});

// Get with redirect response method
app.get("/redirect", (req, res) => {
  res.redirect("https://www.google.com");
});

// Routing params
app.get("/class/:id", (req, res) => {
  const studentId = Number(req.params.id);

  const student = data.filter((student) => student.id === studentId);
  res.send(student);
});

// lets perfom route chaining
app
  .route("/class")
  .get((req, res) => {
    // res.send("Retrieving all students");
    throw new Error();
  })
  .post((req, res) => {
    res.send("Creating a new student");
  })
  .put((req, res) => {
    res.send("Updating a student");
  })
  .delete((req, res) => {
    res.send("Deleting a student");
  });

// Post
app.post("/create", (req, res) => {
  res.send("This is post request at /create");
});

// Put
app.put("/put", (req, res) => {
  res.send("This is a put request at /put");
});

// Delete

app.delete("/delete", (req, res) => {
  res.send("This is a delete request at /delete");
});

// managing error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// Add a object in the data array
app.post('/add',(req,res) =>{
    const newStudent = {
        id: data.length + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    }
    data.push(newStudent);
    res.send("Added successfully")
});

// update a certain object in the data array
app.put('/update/:id',(req,res) =>{
    const studentId = Number(req.params.id);
    const studentIndex = data.findIndex(student => student.id === studentId);
    data[studentIndex].first_name = req.body.first_name;
    data[studentIndex].last_name = req.body.last_name;
    data[studentIndex].email = req.body.email;
    res.send("Updated successfully")
}
);
  
  
  
// / /// /// / /// ROUTES /// /// //// /// // //
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
