const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const task = new Schema({
    name: {
        type: String,
        required: true
    },
    position : {
        type: Number,
        required: true
    },
    status : {
        type: String,
        required: true,
        default: 'pending'
    },
    listId : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'List'
    }
})

const Task = mongoose.model('Task', task);
module.exports = Task;