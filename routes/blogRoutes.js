const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  userBlogController,
} = require("../controllers/blogController");

//router object
const router = express.Router();

//routes
// GET || all blogs
router.get("/all-blog", getAllBlogsController);

//POST || create blog
router.post("/create-blog", createBlogController);

//PUT || update blog
router.put("/update-blog/:id", updateBlogController);

//GET || Single Blog Details
router.get("/get-blog/:id", getBlogByIdController);

//GET || user blog
router.get("/user-blog/:id", userBlogController);

//DELETE || delete blog
router.delete("/delete-blog/:id", deleteBlogController);

module.exports = router;
