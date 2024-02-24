const { Router } = require('express');
const { projectSchema, deleteSchema } = require('../types/types');
const { User, Project, Todo } = require('../db/db');
const verifyToken = require('../middlewares/verifyToken');
const todoRouter = require('./todoRouter');
const projectRouter = Router()

projectRouter.use('/todo', todoRouter)


// Route to CREATE a new Project
projectRouter.post("/", verifyToken, async (req, res) => {
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
        } catch (e) { }
    } else {
        res.status(432).json({
            message: "Project title requires min. 3 characters",
        });
    }
});

// Route to GET all the projects for a specific user
projectRouter.get("/projects", verifyToken, async (req, res) => {
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

// Route to DELETE a Project
projectRouter.delete("/", verifyToken, async (req, res) => {
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


module.exports = projectRouter