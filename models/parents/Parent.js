const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const parentSchema = new Schema({
    firstname: {
        type: String,
        required: true
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
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
    }
});

module.exports = mongoose.model('Parent', parentSchema)