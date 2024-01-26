const express = require("express");
const bodyParser = require("body-parser");
const { todoSchema, todoUpdateSchema } = require("./types");

const PORT = 3000;
const app = express();

// Using Express.json() middleware to parse the Request bodies
app.use(express.json());

// Defining the routes

// Route to CREATE a new Todo
app.post("/todo", (req, res) => {
  // const todoTitle = req.body.title;
  // const todoDescription = req.body.description;
  // const todoStatus = req.body.completed;
  const newTodo = todoSchema.safeParse(req.body);

  if (newTodo.success) {
    res.status(200).json({
      message: "New todo has been created",
    });
    // put in mongoDB
  } else {
    res.status(411).json({
      message: "Some wrong type of data has been passed",
    });
  }
});

// Route to READ all Todo's
app.get("/todos", (req, res) => {
  //get todos from mongoDB
});

// Route to UPDATE the completion of todo's
app.put("/completed", (req, res) => {
  const id = todoUpdateSchema.safeParse(req.body);

  if (id.success) {
    res.status(200).json({
      message: "Marked as completed",
    });
    // Update mongo DB
  } else {
    res.status(411).json({
      message: "Wrong ID",
    });
  }
});

// Server is listening on the PORT
app.listen(PORT);
