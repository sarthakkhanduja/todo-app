const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const {
  todoSchema,
  todoUpdateSchema,
  signUpSchema,
  signInSchema,
} = require("./types");
const { Todo, User } = require("./db");
const jwt = require("jsonwebtoken");

const PORT = 3001;
const JWT_PASSWORD = "JwtPassword";
const app = express();

// Using Express.json() middleware to parse the Request bodies
app.use(express.json());
app.use(cors());

// Defining the routes

// Route to CREATE a new Todo
app.post("/todo", async (req, res) => {
  const newTodo = todoSchema.safeParse(req.body);
  console.log(req.body);
  console.log(newTodo);

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

// Route to Sign Up
app.post("/signup", async (req, res) => {
  const body = signUpSchema.safeParse(req.body);

  if (body.success) {
    // Check if the user already exists
    const existingUser = await User.findOne({
      email: body.data.email,
    });

    if (existingUser) {
      res.status(420).json({
        message: "User already exists",
      });
      return;
    }

    try {
      const newUser = await User.create({
        name: body.data.name,
        email: body.data.email,
        password: body.data.password,
      });
      //console.log(`New user created: ${newUser}`);
      res.status(200).json({
        message: "User created!",
      });
    } catch (e) {
      res.status(400).json({
        message: "Problem while creating user in the database",
      });
    }
  } else {
    res.status(411).json({
      message: "Inputs are invalid, please check and try again",
    });
  }
});

// Route to sign in, and return a JWT token
app.post("/signin", async (req, res) => {
  const body = signInSchema.safeParse(req.body);

  if (body.success) {
    // Check if the user exists in the database
    try {
      const existingUser = await User.findOne({
        email: body.data.email,
        password: body.data.password,
      });

      if (existingUser) {
        let token = jwt.sign(
          {
            email: body.data.email,
          },
          JWT_PASSWORD
        );
        res.status(200).json({
          token,
        });
        return;
      } else {
        res.status(403).json({
          message: "User not found",
        });
      }
    } catch (e) {
      res.status(401).json({
        message: "Something went wrong in the database call",
      });
    }
  } else {
    res.status(411).json({
      message: body.error,
    });
  }
});

// Server is listening on the PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
