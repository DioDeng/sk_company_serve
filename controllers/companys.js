const validator = require("validator");
const resSuccess = require("../service/resSuccess");
const appError = require("../service/appError");
const Company = require("../models/Company");
const Order = require("../models/Order");

const companys = {
  // 取得
  async getCompanys(req, res, next) {
    const companyList = await Company.find().exec();

    resSuccess(res, 200, companyList);
  },
  // 取得廠商合作紀錄
  async getCooperateList(req, res, next) {
    const { id } = req.params;
    if (!id) {
      return next(appError(400, "欄位未填寫正確！", next));
    }

    const isCompanyExist = await Company.findById(id).exec();
    if (!isCompanyExist) {
      return next(appError(400, "廠商不存在", next));
    }

    const orderList = await Order.find().populate({
      path: "company",
    });

    const newWorkerList = [];

    orderList.forEach((item) => {
      if (item.company._id.toString() === id) {
        newWorkerList.push(item);
      }
    });
    resSuccess(res, 200, newWorkerList);
  },
  // 新增
  async postCompany(req, res, next) {
    const { companyName, name, phone, taxIdNumber, address } = req.body;

    if (!companyName || !name || !phone) {
      return next(appError(400, "欄位未填寫正確！", next));
    }

    const newCompany = await Company.create({
      companyName,
      name,
      phone,
      taxIdNumber,
      address,
    });

    resSuccess(res, 201, newCompany);
  },
  // 修改
  async patchCompany(req, res, next) {
    const { companyName, name, phone, taxIdNumber, address, _id } = req.body;

    if (!companyName && !name && !phone && !taxIdNumber && !address) {
      return next(appError(400, "欄位未填寫正確！", next));
    }

    const isCompanyExist = await Company.findById(_id);
    if (!isCompanyExist) {
      return next(appError(400, "廠商不存在！", next));
    }

    const editCompany = await Company.findByIdAndUpdate(
      _id,
      {
        companyName,
        name,
        phone,
        taxIdNumber,
        address,
      },
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    resSuccess(res, 200, editCompany);
  },
  // 刪除
  async deleteCompany(req, res, next) {
    const { _id } = req.params;

    const isCompanyExist = await Company.findByIdAndDelete(_id).exec();
    if (!isCompanyExist) {
      return next(appError(400, "查無此廠商！", next));
    }

    resSuccess(res, 200, isCompanyExist);
  },
};

module.exports = companys;
