const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const {
  todoSchema,
  todoUpdateSchema,
  signUpSchema,
  signInSchema,
  projectSchema,
  getTodoSchema,
  deleteSchema,
} = require("./types");
const { Todo, User, Project } = require("./db");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middlewares/verifyToken");

const PORT = 3001;
const JWT_PASSWORD = process.env.JWT_PASSWORD;
const app = express();

// Using Express.json() middleware to parse the Request bodies
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://gettowork-backend.vercel.app",
      "https://gettowork.vercel.app",
      "http://127.0.0.1:5173",
    ],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
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
  // console.log(newTodo);

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
  try {
    const projectId = req.query.projectId; // Extract projectId from query parameters
    // console.log(projectId);

    if (!projectId) {
      return res.status(400).json({ message: "projectId is required" });
    }

    const currentUser = await User.findOne({ email: req.user.email });

    const project = await Project.findOne({
      _id: projectId,
      user: currentUser._id,
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const todoIds = project.todos;

    const todos = await Todo.find({ _id: { $in: todoIds } });

    res.status(200).json({ todos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to UPDATE the completion of todo's
app.put("/updateStatus", verifyToken, async (req, res) => {
  const id = todoUpdateSchema.safeParse(req.body);
  // console.log(id);

  if (id.success) {
    // Update mongo DB
    const findTodo = await Todo.findOne({
      _id: id.data.id,
    });
    // console.log(findTodo);
    const associatedUserId = findTodo.user;
    const findUser = await User.findOne({
      _id: associatedUserId,
    });

    if (findUser.email == req.user.email) {
      try {
        if (id.data.status === "Completed") {
          const todoNotInProg = await Todo.findOne({
            _id: id.data.id,
            inProgressAt: null,
          });
          if (todoNotInProg) {
            const updateTodo = await Todo.updateOne(
              {
                _id: id.data.id,
              },
              {
                status: id.data.status,
                completedAt: new Date(),
                inProgressAt: new Date(),
              }
            );
          } else {
            const updateTodo = await Todo.updateOne(
              {
                _id: id.data.id,
              },
              {
                status: id.data.status,
                completedAt: new Date(),
              }
            );
          }
        } else if (id.data.status === "In Progress") {
          const updateTodo = await Todo.updateOne(
            {
              _id: id.data.id,
            },
            {
              status: id.data.status,
              completedAt: null,
              inProgressAt: new Date(),
            }
          );
        } else {
          const updateTodo = await Todo.updateOne(
            {
              _id: id.data.id,
            },
            {
              status: id.data.status,
              completedAt: null,
              inProgressAt: null,
            }
          );
        }

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

// Route to DELETE a Project
app.delete("/project", verifyToken, async (req, res) => {
  const body = deleteSchema.safeParse(req.body);
  const currentUser = await User.findOne({ email: req.user.email });

  if (body.success) {
    // Deleting all todo's with the given project ID
    const deleteTodo = await Todo.deleteMany({
      project: body.data.id,
    });

    console.log("Delete Todo: ");
    console.log(deleteTodo);

    // Deleting the project with the given ID
    const deleteProject = await Project.deleteOne({
      _id: body.data.id,
    });

    console.log("Delete Project: ");
    console.log(deleteProject);

    // Deleting the project from the user's projects array
    // Splicing the project from the user's projects array
    const updatedProjects = currentUser.projects.filter(
      (projectId) => projectId.toString() !== body.data.id
    );

    const updateUser = await User.updateOne(
      {
        _id: currentUser._id,
      },
      {
        projects: updatedProjects,
      }
    );

    console.log("Update User: ");
    console.log(updateUser);

    res.status(200).json({
      message: "Project Deleted",
    });
  } else {
    res.status(454).json({
      message: "Inavlid Project ID",
    });
  }
});

// Route to DELETE a todo from a given project
app.delete("/todo", verifyToken, async (req, res) => {
  const body = deleteSchema.safeParse(req.body);
  const currentUser = await User.findOne({ email: req.user.email });

  // console.log("Current User: ");
  // console.log(currentUser);

  if (body.success) {
    const currentTodo = await Todo.findOne({
      _id: body.data.id,
    });

    if (currentTodo) {
      console.log("---------In here");
      const currentProjectId = currentTodo.project;
      const currentProject = await Project.findOne({
        user: currentUser._id,
        _id: currentProjectId,
      });

      console.log("----------Current Project ID: ");
      console.log(currentProjectId);

      console.log("-----------Current Project: ");
      console.log(currentProject);

      // Delete the Todo with the given ID
      const deleteTodo = await Todo.deleteOne({
        _id: body.data.id,
        user: currentUser._id,
      });

      console.log("--------Delete Todo");
      console.log(deleteTodo);

      // Splicing the todos array of the project
      const updatedTodosArray = currentProject.todos.filter(
        (todoId) => todoId.toString() !== body.data.id
      );

      console.log(updatedTodosArray);

      const updateProject = await Project.updateOne(
        {
          _id: currentProject._id,
        },
        {
          todos: updatedTodosArray,
        }
      );

      res.status(200).json({
        message: "Todo deleted",
      });
    } else {
      res.status(440).json({
        message: "Todo with the given ID doesn't exist",
      });
      return;
    }
  } else {
    res.status(460).json({
      message: "Invalid Todo ID",
    });
  }
});

app.all("*", (req, res) => {
  res.status(200).json({
    message: "This might not be the page you're looking for",
  });
});

// Server is listening on the PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
