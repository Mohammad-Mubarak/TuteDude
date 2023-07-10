

const Review = require("../models/Review")


exports.addcomment = async (req, res) => {
  try {
    const { comment, name, bookid } = req.body
    const bookAdd = await Review.findOne({ book: bookid })
    const msg = {
      name: name,
      message: comment
    }

    if (!bookAdd) {
      const ReviewAdd = new Review({
        book: bookid,
        comments: [msg]
      })
      const savedReview = await ReviewAdd.save()
      return res.status(200).json(savedReview)
    } else {
      bookAdd.comments.push(msg)

      const savedReview = await bookAdd.save()
      res.status(200).json(savedReview)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "server error" })
  }
}

exports.addRating = async (req, res) => {
  try {
    const { rate, bookid } = req.body
    const bookAdd = await Review.findOne({ book: bookid })

    if (!bookAdd) {
      const ReviewAdd = new Review({
        book: bookid,
        rating: rate
      })

      const savedReview = await ReviewAdd.save()
      return res.status(200).json(savedReview)
    } else {
      bookAdd.rating = rate

      const savedReview = await bookAdd.save()
      res.status(200).json(savedReview)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
}




exports.allComments = async (req, res) => {
  try {
   const bookid = req.params.id
    const bookAdd = await Review.find({book:bookid})

    if(!bookAdd){
         res.json({
          message :"no reviews avaiable"
         })
    }
    res.status(200).json(bookAdd)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
}
