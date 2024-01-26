const express = require("express");
const bodyParser = require("body-parser");
const { todoSchema, todoUpdateSchema } = require("./types");
const { Todo } = require("./db");

const PORT = 3000;
const app = express();

// Using Express.json() middleware to parse the Request bodies
app.use(express.json());

// Defining the routes

// Route to CREATE a new Todo
app.post("/todo", async (req, res) => {
  const newTodo = todoSchema.safeParse(req.body);

  if (newTodo.success) {
    // put in mongoDB
    try {
      const newTodo_DB = await Todo.create({
        title: newTodo.data.title,
        description: newTodo.data.description,
        completed: newTodo.data.completed,
      });
      res.status(200).json({
        message: "New todo has been created",
        value: newTodo_DB,
      });
    } catch (e) {
      res.status(400).json({
        message: "Some error occurred",
      });
    }
  } else {
    res.status(411).json({
      message: "Some wrong type of data has been passed",
    });
  }
});

// Route to READ all Todo's
app.get("/todos", async (req, res) => {
  //get todos from mongoDB
  try {
    const allTodos = await Todo.find({});
    res.status(200).json({
      allTodos,
    });
  } catch (e) {
    res.status(400).json({
      message: "Some error occurred",
    });
  }
});

// Route to UPDATE the completion of todo's
app.put("/completed", async (req, res) => {
  const id = todoUpdateSchema.safeParse(req.body);
  console.log(id);

  if (id.success) {
    // Update mongo DB
    try {
      const updateTodo = await Todo.updateOne(
        {
          _id: id.data.id,
        },
        {
          completed: true,
        }
      );
      res.status(200).json({
        message: "Marked as completed",
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        message: "Some error occurred",
      });
    }
  } else {
    res.status(411).json({
      message: "Wrong ID",
    });
  }
});

// Server is listening on the PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
