const validator = require("validator");
const resSuccess = require("../service/resSuccess");
const appError = require("../service/appError");
const Order = require("../models/Order");

const orders = {
  // 取得所有工單
  async getOrders(req, res, next) {

    // 排序
    const sort = req.query.sort == "asc" ? "createdAt" : "-createdAt";

    // 關鍵字搜尋
    const keyword =
      req.query.keyword !== undefined
        ? { company: req.query.keyword }
        : {};

    const orderList = await Order.find(keyword)
      .populate({
        path: "company",
      })
      .populate({
        path: "workers._id",
      }).sort(sort);

    resSuccess(res, 200, orderList);
  },
  // 取得單一工單
  async getOrder(req, res, next) {
    const { id } = req.params;
    if (!id) {
      return next(appError(400, "欄位未填寫正確！", next));
    }

    const isOrderExist = await Order.findById(id)
      .populate({
        path: "company",
      })
      .populate({
        path: "workers._id",
      });
    if (!isOrderExist) {
      return next(appError(400, "工單不存在！", next));
    }

    resSuccess(res, 200, isOrderExist);
  },
  // 新增工單
  async postOrder(req, res, next) {
    const {
      company,
      address,
      paymentMethod,
      total,
      retainage,
      constructionDate,
      workers,
      transferWorkers,
    } = req.body;

    if (
      !company ||
      !address ||
      !paymentMethod ||
      !total ||
      !retainage ||
      !constructionDate
    ) {
      return next(appError(400, "欄位未填寫正確！", next));
    }

    const newOrder = await Order.create({
      company,
      address,
      paymentMethod,
      total,
      retainage,
      constructionDate,
      workers,
      transferWorkers,
    });

    resSuccess(res, 201, newOrder);
  },
  // 修改工單狀態
  async patchOrderStatus(req, res, next) {
    const { status, _id } = req.body;

    const isOrderExist = await Order.findById(_id);

    if (!isOrderExist) {
      return next(appError(400, "工單不存在", next));
    }

    const newStatus = await Order.findByIdAndUpdate(
      _id,
      {
        status: !status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    resSuccess(res, 200, newStatus);
  },
  // 修改工單
  async patchOrder(req, res, next) {
    const {
      _id,
      address,
      company,
      paymentMethod,
      total,
      retainage,
      workers,
      transferWorkers,
    } = req.body;

    const isOrderExist = await Order.findById(_id);
    if (!isOrderExist) {
      return next(appError(400, "工單不存在", next));
    }
    const editOrder = await Order.findByIdAndUpdate(_id, {
      address,
      company,
      paymentMethod,
      total,
      retainage,
      workers,
      transferWorkers,
    });

    resSuccess(res, 200, editOrder);
  },
  // 刪除工單
  async deleteOrder(req, res, next) {
    const { id } = req.params;

    const isOrderExist = await Order.findByIdAndDelete(id).exec();

    resSuccess(res, 200, isOrderExist);
  },
};

module.exports = orders;
