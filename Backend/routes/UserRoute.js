
const express = require('express')
const router = express.Router()
const { signup, login, logout } = require("../controller/UserController")
const { search, BookById ,favouraiteBook} = require("../controller/BookController")
const Book= require("../models/Book")


const {UserLoggedIn} = require("../middlewares/userLoggedIn")
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
router.route("/md").get(UserLoggedIn,(_,res)=>{
    res.json({
        message:"done"
    })
})


router.route("/favouraite").post(favouraiteBook)



router.route("/allbooks").get(async (req, res) => {
    const Curr_Book = await Book.find()
    return res.json(Curr_Book)
})




module.exports = router
