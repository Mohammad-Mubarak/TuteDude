

const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    rating: {
        one: {
            type: Number,
            default: 0
        },
        two: {
            type: Number,
            default: 0
        },
        three: {
            type: Number,
            default: 0
        },
        four: {
            type: Number,
            default: 0
        },
        five: {
            type: Number,
            default: 0
        }
    },
    comments: {
        type:{
            name:String,
            message:String,
        }
    }
})


const Review = mongoose.model('Review', reviewSchema)
module.exports = Review
