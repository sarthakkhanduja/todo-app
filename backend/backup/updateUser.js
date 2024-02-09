const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://sarthakkhanduja:Sarthak%40123@test-cluster-sarthak.fxb1y3m.mongodb.net/todoApp"
);

const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});

// Function to update Todo documents
async function updateUsers() {
  try {
    await User.updateMany({}, [
      { $set: { projects: [] } }, // Add status with default value and set project to null
      { $unset: ["project"] },
    ]);

    console.log("Users updated");
  } catch (error) {
    console.error("Error updating Users:", error);
  }
}

// Update Todos, Users, and Projects
async function updateData() {
  try {
    await updateUsers();
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Run the update process
updateData();
console.log("Done!");
