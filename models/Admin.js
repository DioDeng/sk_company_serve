const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    account: {
        type: String,
        require: [true, '請輸入 帳號'],
        unique: true,
    },
    password: {
        type: String,
        require: [true, '請輸入 Password'],
        select: false
    },
    phone: {
        type: String,
    },
    createTime: {
        type: Date,
        default: Date.now,
        select: false
    }
}, { versionKey: false})

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;