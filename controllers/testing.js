/**
 * Router for testing purposes
 * Provides an endpoint to reset the database
 * @file controllers/testing.js
 * @description Testing controller.
 */

const testingRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

/**
 * Reset the database by deleting all blog posts and users
 * @route POST /reset
 * @returns {void} No content response (204)
 */
testingRouter.post("/reset", async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = testingRouter;
