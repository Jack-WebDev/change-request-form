const express = require("express");
const multer = require("multer");
const path = require("path");
const postRouter = express.Router();
const { postForm } = require("../controller/formController");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb,next) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },

});

const upload = multer({
  storage: storage,
});

postRouter.post("/changeRequest",upload.array("files"), postForm);


module.exports = postRouter;
