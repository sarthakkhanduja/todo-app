const express = require("express");
const bodyParser = require("body-parser");

const PORT = 3000;
const app = express();

// Using Express.json() middleware to parse the Request bodies
app.use(express.json());

// Defining the routes

// Route to CREATE a new Todo
app.post("/todo", (req, res) => {});

// Route to READ all Todo's
app.get("/todos", (req, res) => {});

// Server is listening on the PORT
app.listen(PORT);
