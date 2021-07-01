const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const parentSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: 'parent'
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
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]
});

module.exports = mongoose.model('Parent', parentSchema)