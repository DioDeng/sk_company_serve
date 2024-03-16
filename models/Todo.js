const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, '請輸入 todo']
    },
    isCheck: {
        type: Boolean,
        default: false,
    },
    createTime: {
        type: Date,
        default: Date.now,
    },
}, {
    versionKey: false,
 })

const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;