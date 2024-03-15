const Users = require("../models/users");
const { hashPassword } = require("../utils/utility");
const { check_user } = require("../validators/RoleValidator");
const { token_provided, verifyToken } = require("../validators/tokenValidator");
const {
  isValidUsername,
  isValidEmail,
  isValidPassword,
} = require("../validators/userValidation");

// Register a new user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username, email, and password are valid
    if (!isValidUsername(username)) {
      return res.status(400).json({
        error:
          "Invalid username. Username must contain only letters, numbers, underscores, and hyphens, and be between 3 to 20 characters long.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        error: "Invalid password. Password must be at least 6 characters long.",
      });
    }

    if (!password) {
      return res.status(400).json({ error: "Password is required." });
    }
    // Check if username and email already exist
    const usernameExist = await Users.findOne({ username: username });
    const emailExist = await Users.findOne({ email: email });

    if (usernameExist) {
      return res.status(401).json({
        error: "Username already exists. Please try another Username.",
      });
    }

    if (emailExist) {
      return res
        .status(401)
        .json({ error: "Email already exists. Please try another email." });
    }
    // Hash the password
    const hashedPassword = await hashPassword(password);
    // Create a new user
    const newUser = await Users.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "New user registered successfully.", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register new user." });
  }
};

//Get the information of specific User
const info = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token_provided(token)) {
      return res
        .status(401)
        .send({ error: "Access denied. Token not provided." });
    }

    const decodedToken = await verifyToken(token);
    console.log(decodedToken);
    if (!decodedToken || !check_user(token)) {
      return res
        .status(403)
        .send({ message: "Forbidden. Only users can perform this action." });
    }

    const userExist = await Users.findOne({ username: decodedToken.username });

    if (!userExist) {
      return res.status(404).send({ error: "User not Found." });
    }

    if (
      !(
        decodedToken.username === userExist.username ||
        decodedToken.role === "superAdmin"
      )
    ) {
      return res.status(401).send({ error: "Sorry, you're not Authorised." });
    }

    return res.status(200).send(userExist);
  } catch (error) {
    console.log(error);
    console.log("idhar kaise");
    return res.status(500).send({ error: "Failed to retrieve data." });
  }
};

// Update the user's information
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization;

    if (!token_provided(token)) {
      return res
        .status(401)
        .send({ error: "Access denied. Token not provided." });
    }

    const decodedToken = verifyToken(token);
    const requestbyUser = await Users.findOne({
      username: decodedToken.username,
    });

    if (requestbyUser._id.toString() !== id) {
      return res.status(403).send({
        error: "Access denied. You are not authorized to update this user.",
      });
    }

    const userToUpdate = await Users.findById(id);

    if (!userToUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.body.username) {
      userToUpdate.username = req.body.username;
    }

    if (req.body.email) {
      userToUpdate.email = req.body.email;
    }

    if (req.body.password) {
      const hashedPassword = await hashPassword(req.body.password);
      userToUpdate.password = hashedPassword;
    }

    const updatedUser = await userToUpdate.save();
    res
      .status(200)
      .json({ message: "User details updated", user_details: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user details" });
  }
};

// DELETE existing users
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization;

    if (!token_provided(token)) {
      return res
        .status(401)
        .send({ error: "Access denied. Token not provided." });
    }

    const decodedToken = verifyToken(token);
    const requestbyUser = await Users.findOne({
      username: decodedToken.username,
    });

    if (!requestbyUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (requestbyUser._id.toString() !== id) {
      return res.status(403).json({
        error: "Access denied. You are not authorized to delete this user.",
      });
    }

    const deletedUser = await Users.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// exports
module.exports = { register, info, update, deleteUser };
