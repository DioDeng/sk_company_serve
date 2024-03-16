var express = require("express");
var router = express.Router();
const TodoControllers = require("../controllers/todos");
const handErrorAsync = require("../service/handErrorAsync");
const { isAdmin } = require("../middleware/auth");

router.get("/admin/todos",isAdmin, handErrorAsync(TodoControllers.getTodoList));
router.post("/admin/todo",isAdmin , handErrorAsync(TodoControllers.postTodo));
router.patch("/admin/todo", isAdmin, handErrorAsync(TodoControllers.updateTodo));
router.delete("/admin/todo/:id", isAdmin, handErrorAsync(TodoControllers.deleteTodo));

module.exports = router;