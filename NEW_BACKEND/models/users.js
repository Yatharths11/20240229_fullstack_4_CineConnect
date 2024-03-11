const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Schema for User
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 4,
  },

  email: {
    type: String,
    required: true,
    // Email Validation here
    validate: {
      validator: function (value) {
        // Regular expression for basic email validation
        return /^[a-zA-Z0-9]+@[a-zA-Z]+\.(com)$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
    enum: ["superAdmin", "admin", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);

// Function to create default superAdmin user
async function createDefaultSuperAdmin() {
  // Check if there are any existing superAdmin users
  const existingSuperAdmin = await mongoose
    .model("User")
    .findOne({ role: "superAdmin" });

  // If no superAdmin user exists, create one
  if (!existingSuperAdmin) {
    const superadminPassword = "pass@123"; // Set the superadmin password

    // Hash the password
    const salt = bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(superadminPassword, salt);
    await mongoose.model("User").create({
      username: "superadmin",
      email: "superadmin@gmail.com",
      password: hashedPassword,
      role: "superAdmin",
    });
  }
}

createDefaultSuperAdmin();
