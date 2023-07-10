
const express = require('express')
const router = express.Router()
const { signup, login, logout } = require("../controller/UserController")
const { search, BookById, favouraiteBook } = require("../controller/BookController")
const Book = require("../models/Book")

const Review = require("../models/Review")

const {addcomment,addRating,allComments} = require("../controller/ReviewController")
const { UserLoggedIn } = require("../middlewares/userLoggedIn")
const FBook = require("../models/FavBook")

// get and post route for signup (//?)
router.route("/signup").post(signup)

//login  route
router.route("/login").post(login)

// logout route //?
router.route("/logout").get(logout)

// searching route
router.route("/search/:value").get(search)

// book details by id
router.route("/book/:id").post().get(BookById)


// testing protected route
router.route("/md").get(UserLoggedIn, (_, res) => {
    res.json({
        message: "done"
    })
})

// added to fav
router.route("/favouraite").post(favouraiteBook)


// get all fav books
router.route("/allfavouraite/:id").get(async (req, res) => {
    const User_FavBook = await FBook.findOne({ userId: req.params.id })
    res.send(User_FavBook.AllBooks)
})


router.route("/allbooks").get(async (req, res) => {
    const Curr_Book = await Book.find()
    return res.json(Curr_Book)
})



// add review
router.route("/addreview").post(addcomment);
  
// All review
router.route("/getreview/:id").get(allComments);

// add rating
router.route("/rate").post(addRating);


module.exports = router
