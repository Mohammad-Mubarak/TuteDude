const Book = require("./Book")
const mongoose = require("mongoose");

const FavBook = new mongoose.Schema({
    userId:String,
    AllBooks:{type: [Book.schema]}
})



const FBook = mongoose.model('FavBook', FavBook)
module.exports = FBook
