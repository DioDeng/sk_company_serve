const validator = require("validator");
const resSuccess = require("../service/resSuccess");
const appError = require("../service/appError");
const Worker = require("../models/Worker");
const Order = require("../models/Order");

const workers = {
  // 取得個人資料
  async getUser(req, res, next) {
    const user = await User.findById(req.user._id);
    resSuccess(res, 200, user);
  },
  // 取得個人工作列表
  async getWorkerList(req, res, next) {
    const { id } = req.params;

    const isUserExist = await Worker.findById(id);
    if (!isUserExist) {
      return next(appError(400, "查無此員工！", next));
    }

    const orderList = await Order.find()
      .populate({
        path: "company",
      })
      .populate({
        path: "workers._id",
      });
    const newWorkerList = [];
    orderList.forEach((item) => {
      item.workers.forEach((data) => {
        if (data._id._id.toString() === id) {
          newWorkerList.push({
            _id: item._id,
            constructionDate: item.constructionDate,
            time: data.time,
          });
        }
      });
    });

    resSuccess(res, 200, newWorkerList);
  },
  // 取得所有員工資料
  async getWorkers(req, res, next) {
    const workerList = await Worker.find();

    resSuccess(res, 200, workerList);
  },
  // 新增員工
  async postWorker(req, res, next) {
    const {
      name,
      phone,
      idNumber,
      imageFront,
      imageBack,
      seniority,
      hourlyRate,
      position,
    } = req.body;

    if (!name || !phone || !idNumber) {
      return next(appError(400, "欄位未填寫正確！", next));
    }

    const newWorker = await Worker.create({
      name,
      phone,
      idNumber,
      seniority,
      hourlyRate,
      imageFront,
      imageBack,
      position,
    });

    resSuccess(res, 201, newWorker);
  },
  // 更新個人資料
  async updateWorker(req, res, next) {
    const {
      name,
      phone,
      idNumber,
      imageFront,
      imageBack,
      seniority,
      hourlyRate,
      position,
      _id,
    } = req.body;

    // 欄位未填寫正確 - 只需填其中一項
    if (
      !name &&
      !phone &&
      !idNumber &&
      !imageFront &&
      !imageBack &&
      !seniority &&
      !hourlyRate
    ) {
      return next(appError(400, "欄位未填寫正確！", next));
    }
    // 名字不小於2字元
    if (!validator.isLength(name, { min: 2 })) {
      return next(appError(400, "名字需為 2 個字元以上！", next));
    }

    const isUserExist = await Worker.findById(_id).exec();
    if (!isUserExist) {
      return next(appError(400, "查無此員工！", next));
    }
    const newWorker = await Worker.findByIdAndUpdate(
      _id,
      {
        name,
        phone,
        idNumber,
        seniority,
        hourlyRate,
        imageFront,
        imageBack,
        position,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    resSuccess(res, 200, newWorker);
  },
  // 刪除員工
  async deleteWorker(req, res, next) {
    const { _id } = req.params;

    const isWorkerExist = await Worker.findByIdAndDelete(_id).exec();
    if (!isWorkerExist) {
      return next(appError(400, "查無此員工！", next));
    }

    resSuccess(res, 200, isWorkerExist);
  },
};

module.exports = workers;
