const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    companyName: {
        type: String,
        require: [true, '請輸入 廠商名稱'],
        unique: true,
    },
    name: {
        type: String,
        require: [true, '請輸入 負責人名稱']
    },
    phone: {
        type: String,
        require: [true, '請輸入 Phone']
    },
    taxIdNumber: {
        type: Number,
        unique: true,
    },
    address: {
        type: String,
    },
    createTime: {
        type: Date,
        default: Date.now,
        select: false
    },
}, {
    versionKey: false,
 })

const Company = mongoose.model('company', CompanySchema);

module.exports = Company;