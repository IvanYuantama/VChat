const express = require("express");
const userRouter = require("./userRoute.js");
const chatRouter = require("./chatRoute.js");
const uploadRoute = require("../cloudinary/routeUpload.js");

const router = express.Router();

router.use("/user", userRouter);
router.use("/chat", chatRouter);
router.use("/cloudinary", uploadRoute);

module.exports = router;
