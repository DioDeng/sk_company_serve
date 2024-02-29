const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, "施工地址 未填寫"],
    },
    company: {
      type: mongoose.Schema.ObjectId,
      ref: "company",
      required: [true, "廠商資料為必填"],
    },
    status: {
      type: Boolean,
      default: false,
    },
    paymentMethod: {
        type: String,
        enum: ['現金','支票'],
        required: [true, '請輸入 產品分類']
    },
    total: {
        type: Number,
        required: [true, '請輸入 金額']
    },
    retainage: {
        type: Number,
        required: [true, '請輸入 保留款']
    },
    constructionDate: {
        type: String,
    },
    image: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    workers: [
        {
          _id: {
            type: mongoose.Schema.ObjectId,
            ref: "worker",
          },
          time: {
            type: Number,
            required: [true, "時間 未填寫"],
          }
        },
      ],
      transferWorkers: [
        {
          name: {
            type: String,
            required: [true, "名字 未填寫"],
          },
          phone: {
            type: String,
            required: [true, "電話 未填寫"],
          },
          time: {
            type: Number,
            required: [true, "時間 未填寫"],
          }
        },
      ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

// 當使用 findxx 時插入 middleware，使 comment user 資料 populate
// OrderSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "worker",
//     select: "name phone",
//   });
//   next();
// });

const Order = new mongoose.model("order", OrderSchema);

module.exports = Order;