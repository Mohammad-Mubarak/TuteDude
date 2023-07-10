const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',

  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  comments: [{
    name: {
      type: String,

    },
    message: {
      type: String,

    }
  }]
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review
