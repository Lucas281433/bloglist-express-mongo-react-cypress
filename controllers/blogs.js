/**
*Router to manage blog operations
*Provides endpoints for CRUD operations on blog posts
*@file controllers/blogs.js
*@description Blog controller. 
*/

const blogsRouter = require("express").Router();
const middleware = require("../utils/middleware");
const Blog = require("../models/blog");

/**
Retrieve all blog posts
@route GET /
@returns {Array} Array of blog post objects 
*/
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

/**
Create a new blog post
@route POST /
@param {Object} request.body - Blog post data to create
@returns {Object} Newly created blog post object 
*/
blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;

  const user = request.user;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  });

  if (!blog.title || !blog.url) {
    response.status(400).end();
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

/**
Delete a blog post
@route DELETE /:id
@param {string} id - ID of the blog post to delete
@returns {Object} Deleted blog post object 
*/
blogsRouter.delete("/:id", middleware.userExtractor, async (request, response) => {
    const user = request.user;

    const blog = await Blog.findById(request.params.id);

    if (blog.user._id.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    }
    response
      .status(400)
      .json({ error: "Only the user who created the blog can delete it" });
});

/**
Update a blog post
@route PUT /:id
@param {string} id - ID of the blog post to update
@param {Object} request.body - Blog post data to update
@returns {Object} Updated blog post object 
*/
blogsRouter.put("/:id", middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;
  const user = request.user

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes, user: user.id },
    { new: true }
  );
  response.json(updatedBlog);
});

module.exports = blogsRouter;
