const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const {
  todoSchema,
  todoUpdateSchema,
  signUpSchema,
  signInSchema,
  projectSchema,
} = require("./types");
const { Todo, User, Project } = require("./db");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middlewares/verifyToken");

const PORT = 3001;
const JWT_PASSWORD = "JwtPassword";
const app = express();

// Using Express.json() middleware to parse the Request bodies
app.use(express.json());
app.use(cors());
// app.use(verifyToken);

// Defining the routes
// Route to CREATE a new Project
app.post("/project", verifyToken, async (req, res) => {
  const newProject = projectSchema.safeParse(req.body);
  let userId = await User.findOne({ email: req.user.email });

  if (newProject.success) {
    try {
      // Check if a project by the same name exists
      const existingProject = await Project.findOne({
        title: newProject.data.title,
      });

      if (
        existingProject &&
        existingProject.user.toString() === userId._id.toString()
      ) {
        res.status(420).json({
          message: "Project with a similar title already exists for this user",
        });
        return;
      }

      // Add this project to the Projects Collection in the DB
      const newProject_DB = await Project.create({
        title: newProject.data.title,
        user: userId._id,
      });

      // console.log(newProject_DB);

      // Add this project within User's
      const updateUser = await User.updateOne(
        {
          email: req.user.email,
        },
        {
          $push: { projects: newProject_DB._id },
        }
      );

      res.status(200).json({
        message: "Project successfully created",
      });
    } catch (e) {}
  } else {
    res.status(432).json({
      message: "Project title requires min. 3 characters",
    });
  }
});

app.get("/name", verifyToken, async (req, res) => {
  res.status(200).json({
    name: req.user.name,
  });
});

// Route to GET all the projects for a specific user
app.get("/projects", verifyToken, async (req, res) => {
  try {
    const currentUser = await User.findOne({
      email: req.user.email,
    });
    const userId = currentUser._id;
    const allProjects = await Project.find({ user: userId });
    res.status(200).json({
      allProjects,
    });
  } catch (e) {
    res.status(400).json({
      message: "Some error occurred",
    });
  }
});

// Route to CREATE a new Todo
app.post("/todo", verifyToken, async (req, res) => {
  const newTodo = todoSchema.safeParse(req.body);
  // console.log("Body:" + req.body);
  console.log(newTodo);

  if (newTodo.success) {
    // put in mongoDB
    try {
      // Check if the given project Id even exists
      let userId = await User.findOne({ email: req.user.email });

      const project = await Project.findOne({
        _id: newTodo.data.projectId,
        user: userId._id,
      });

      if (!project) {
        res.status(409).json({
          message: "Project ID entered is invalid",
        });
        return;
      }

      // Create Todo
      const newTodo_DB = await Todo.create({
        title: newTodo.data.title,
        description: newTodo.data.description,
        user: userId._id,
        project: newTodo.data.projectId,
      });

      // Update the project's todo array
      const updateProject = await Project.updateOne(
        {
          _id: newTodo.data.projectId,
          user: userId._id,
        },
        {
          $push: {
            todos: newTodo_DB._id,
          },
        }
      );
      res.status(200).json({
        message: "New todo has been created",
        value: newTodo_DB,
      });
    } catch (e) {
      res.status(400).json({
        message: "Some error occurred while creating the Todo in the database",
        error: e,
      });
    }
  } else {
    res.status(411).json({
      message:
        "Some wrong type of data has been passed. Please check your ProjectId",
    });
  }
});

// Route to READ all Todo's
app.get("/todos", verifyToken, async (req, res) => {
  //get todos from mongoDB
  try {
    const currentUser = await User.findOne({
      email: req.user.email,
    });
    const userId = currentUser._id;
    const allTodos = await Todo.find({ user: userId });
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
app.put("/updateStatus", verifyToken, async (req, res) => {
  const id = todoUpdateSchema.safeParse(req.body);

  if (id.success) {
    // Update mongo DB
    const findTodo = await Todo.findOne({
      _id: id.data.id,
    });
    const associatedUserId = findTodo.user;
    const findUser = await User.findOne({
      _id: associatedUserId,
    });

    if (findUser.email == req.user.email) {
      try {
        const updateTodo = await Todo.updateOne(
          {
            _id: id.data.id,
          },
          {
            status: id.data.status,
          }
        );

        // Finding the associated project with the given ToDo
        const associatedProject = await Project.findOne({
          _id: findTodo.project,
        });

        // Updating the progress of the project
        let totalTodos = associatedProject.todos.length;
        let completedTodos = 0;

        for (let i = 0; i < totalTodos; i++) {
          const currentTodoId = associatedProject.todos[i];
          const currentTodo = await Todo.findOne({
            _id: currentTodoId,
          });

          if (currentTodo.status == "Completed") {
            completedTodos += 1;
          }
        }

        let updatedProgress = (completedTodos / totalTodos) * 100;

        const updateProject = await Project.updateOne(
          {
            _id: findTodo.project,
          },
          {
            progress: updatedProgress,
          }
        );

        res.status(200).json({
          message: "Updated the status",
        });
      } catch (e) {
        console.log(e);
        res.status(400).json({
          message: "Some error occurred",
        });
      }
    } else {
      res.status(401).json({
        message: "Unauthorized access to the Todo",
      });
    }
  } else {
    res.status(411).json({
      message: "Wrong Input, either the ID or the status",
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
        message: "User with a similar email already exists",
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
      error: body.error,
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

      // console.log(existingUser);

      if (existingUser) {
        let token = jwt.sign(
          {
            email: body.data.email,
            name: existingUser.name,
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
