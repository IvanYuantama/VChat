const chatController = require("../controllers/chatController");
const express = require("express");
const chatRouter = express.Router();

chatRouter.post("/add", chatController.add);
chatRouter.put("/edit/:id", chatController.edit);
chatRouter.delete("/delete/:id", chatController.delete);
chatRouter.get("/:id", chatController.getChatById);

module.exports = chatRouter;
