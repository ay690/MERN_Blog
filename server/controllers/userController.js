const userModel = require("../models/userModel");
const bycrpt = require("bcryptjs");

//get all users
exports.getAllUsers = async (req, res) => {
  try {

    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      message: "All users data",
      users,
    })

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in get all users callback",
      success: false,
      error,
    });
  }
};

//create user register user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({
        message: "Please fill all the details",
        success: false,
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        message: "User already exist 😊",
        success: false,
      });
    }

    const hashedPassword = await bycrpt.hash(password, 10);

    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();

    return res.status(201).send({
      message: "New User created 😃",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in register callback",
      success: false,
      error,
    });
  }
};

//login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).send({
        message: "Please provide your email or password 😭",
        success: false,
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(403).send({
        message: "Email not registered 😑",
        success: false,
      });
    }

    const isMatch = await bycrpt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({
        message: "Invalid credentials 😥",
        success: false,
      });
    }

    return res.status(200).send({
      message: "User logged in successfully 🫠",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error from login callback 😑",
      success: false,
      error,
    });
  }
};
