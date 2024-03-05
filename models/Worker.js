const mongoose = require('mongoose');

const WorkerSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        require: [true, '請輸入 Phone']
    },
    idNumber: {
        type:String, 
    },
    frontImg: {
        type:String, 
        // required: [true, '請上傳 身分證正面照']
    },
    backImg: {
        type:String, 
        // required: [true, '請上傳 身分證背面照']
    },
    seniority: {
        type: String,
        required: [true, '請輸入 入職日期']
    },
    hourlyRate: {
        type: Number,
        default: 0,
    },
    position: {
        type: String,
        enum: ['工頭','工地主任','監工', '工人'],
        default: '工人',
    },
    // timeBook: [
    //     {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "order",
    //     }
    // ],
    createTime: {
        type: Date,
        default: Date.now,
        select: false
    },
}, {
    versionKey: false,
 })

const Worker = mongoose.model('worker', WorkerSchema);

module.exports = Worker;