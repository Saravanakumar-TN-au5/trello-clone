const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const list = new Schema({
    name : {
        type: String,
        required: true
    },
    position : {
        type: Number,
        required: true
    },
    tasks: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Task'
    }]
})

const List = mongoose.model('List', list);
module.exports = List;