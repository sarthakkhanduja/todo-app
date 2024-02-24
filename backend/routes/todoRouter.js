const { Router } = require('express');
const verifyToken = require('../middlewares/verifyToken');
const { todoSchema, deleteSchema, todoUpdateSchema } = require('../types/types');
const { User, Project, Todo } = require('../db/db');
const todoRouter = Router()


// Route to CREATE a new Todo
todoRouter.post("/", verifyToken, async (req, res) => {
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
todoRouter.get("/todos", verifyToken, async (req, res) => {
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
todoRouter.put("/updateStatus", verifyToken, async (req, res) => {
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

// Route to DELETE a todo from a given project
todoRouter.delete("/", verifyToken, async (req, res) => {
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


module.exports = todoRouter