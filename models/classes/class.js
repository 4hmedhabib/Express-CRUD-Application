const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const classSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        default: 'class'
    },
    section: {
        type: String,
        enum: ['morning', 'afternoon'],
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        default: null
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    status: {
        type: Boolean,
        default: false
    }, 
    details: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Class', classSchema)