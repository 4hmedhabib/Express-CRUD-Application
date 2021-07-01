const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    stdID: {
        type: Number,
        default: 102,
    },
    lastname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    title: {
        type: String,
        default: 'student'
    },
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class'
    },
    age: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Parent',
        required: true
    }
});

module.exports = mongoose.model('Student', studentSchema);