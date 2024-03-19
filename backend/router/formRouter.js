const express = require("express");
const postRouter = express.Router();
const postForm = require("../controller/formController");

postRouter.post("/changeRequest", postForm);

module.exports = postRouter;
