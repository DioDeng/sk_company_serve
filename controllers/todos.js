const resSuccess = require("../service/resSuccess");
const appError = require("../service/appError");
const Todo = require("../models/Todo");

const todos = {
  // 取得todos列表
  async getTodoList(req, res, next) {
    const todoList = await Todo.find();
    resSuccess(res, 200, todoList);
  },
  // 新增todos
  async postTodo(req, res, next) {
    const {
        title
    } = req.body;

    if (!title) {
      return next(appError(400, "欄位未填寫正確！", next));
    }
    
    const newTodo = await Todo.create({
      title
    });

    resSuccess(res, 201, newTodo);
  },
  // 修改
  async updateTodo(req, res, next) {
    const {
      title,
      isCheck,
      _id,
    } = req.body;

    // 欄位未填寫正確 - 只需填其中一項
    if (
      !title &&
      !_id
    ) {
      return next(appError(400, "欄位未填寫正確！", next));
    }

    const isTodoExist = await Todo.findById(_id).exec();
    if (!isTodoExist) {
      return next(appError(400, "查無此代辦事項！", next));
    }
    const newTodo = await Todo.findByIdAndUpdate(
      _id,
      {
        title,
        isCheck: !isCheck
      },
      {
        new: true,
        runValidators: true,
      }
    );

    resSuccess(res, 200, newTodo);
  },
  // 刪除員工
  async deleteTodo(req, res, next) {
    const { id } = req.params;

    const isTodoExist = await Todo.findByIdAndDelete(id).exec();
    if (!isTodoExist) {
      return next(appError(400, "查無此代辦事項！", next));
    }

    resSuccess(res, 200, isTodoExist);
  },
};

module.exports = todos;
