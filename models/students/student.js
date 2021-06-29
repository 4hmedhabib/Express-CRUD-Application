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
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
    }
});

module.exports = mongoose.model('Student', studentSchema);