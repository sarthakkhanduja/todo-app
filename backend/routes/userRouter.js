const { Router } = require('express');
const { signInSchema, signUpSchema } = require('../types/types');
const { User } = require('../db/db');
const jwt = require("jsonwebtoken");
const verifyToken = require('../middlewares/verifyToken');
const userRouter = Router()

const JWT_PASSWORD = process.env.JWT_PASSWORD;


// Route to Sign Up
userRouter.post("/signup", async (req, res) => {
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
userRouter.post("/signin", async (req, res) => {
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
                    token
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

// route to get the name of the user
userRouter.get("/name", verifyToken, async (req, res) => {
    res.status(200).json({
        name: req.user.name,
    });
});

module.exports = userRouter