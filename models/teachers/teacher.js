const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    classes: [{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }],
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
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
        default: 'teacher'
    },
    status: {
        type: Boolean,
        default: true
        
    }, 
});

module.exports = mongoose.model('Teacher', teacherSchema)