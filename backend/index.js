const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/rootRouter");
require("dotenv").config();
const app = express();
const PORT = 3001;

// middlewares

// express.json() middleware to parse the Request bodies
app.use(express.json());
// cors middleware to allow cross-origin requests
app.use(
  cors({
    origin: [
      "https://gettowork-backend.vercel.app",
      "https://gettowork.vercel.app",
      "http://127.0.0.1:5173",
      "http://localhost:5173",
    ],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
// rootRouter middleware to handle all the routes
app.use('/api/v1', rootRouter)


// Server is listening on the PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
