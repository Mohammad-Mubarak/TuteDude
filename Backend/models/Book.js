const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  book_url: {
    type: String,
  },
  book_name: {
    type: String,
  },
  book_author: {
    type: String,
  },
  book_description: {
    type: String,
  },
  book_genre: {
    type: String,
  },
  book_publish_year: {
    type: String,
  },
  id: {
    type: Number,
  }
})

const Book = mongoose.model('Book', bookSchema)
module.exports = Book
