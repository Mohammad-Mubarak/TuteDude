
const Book = require("../models/Book")
const FBook = require("../models/FavBook")

exports.search = async (req, res)=> {
    try {

        const searchValue = req.params.value
        const result = await Book.find({
            $or: [
                { book_name: { $regex: searchValue, $options: "i" } },
                { book_author: { $regex: searchValue, $options: "i" } },
                { book_genre: { $regex: searchValue, $options: "i" } },
            ],
        })
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "An error occurred while searching for books" })
    }
};


exports.BookById = async (req, res)=> {
    try {
        console.log(req.params.id)
        const Book_ID = req.params.id
        const result = await Book.findById(Book_ID)
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "An error occurred while searching for books" })
    }
};


exports.favouraiteBook = async (req, res)=> {
    try {
        const { userId, BookId } = req.body
        const Curr_Book = await Book.findById({_id:BookId})
        const User_FavBook = await FBook.findOne({userId})
        User_FavBook.AllBooks.push(Curr_Book) // Push Curr_Book into AllBooks array
        const BookSaved = await User_FavBook.save()
        
        res.json(BookSaved)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "An error occurred" })
    }
};