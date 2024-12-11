/**
 * Router to manage user operations
 * Provides endpoints for creating and retrieving users
 * @file controllers/users.js
 * @description Users controller.
 */

const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

/**
 * Create a new user
 * @route POST /
 * @param {Object} request.body - User data to create
 * @returns {Object} Newly created user object
 */

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (username.length < 3 || password.length < 3) {
    response
      .status(400)
      .json({ error: "Username and password must be at least 3 characters" })
      return
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

/**
 * Retrieve all users
 * @route GET /
 * @returns {Array} Array of user objects with populated blog data
 */
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.status(200).json(users);
});

module.exports = usersRouter;
