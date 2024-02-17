const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://sarthakkhanduja:Sarthak%40123@test-cluster-sarthak.fxb1y3m.mongodb.net/todoApp"
);

const Todo = mongoose.model("Todo", {
  title: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Function to update Todo documents
async function updateTodos() {
  const currDate = new Date();
  try {
    await Todo.updateMany(
      {
        status: "Completed",
      },
      [
        { $set: { completedAt: currDate } }, // Add status with default value and set project to null
      ]
    );

    console.log("Todos updated");
  } catch (error) {
    console.error("Error updating Todos:", error);
  }
}

// Update Todos, Users, and Projects
async function updateData() {
  try {
    await updateTodos();
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Run the update process
updateData();
console.log("Done!");
