const mongoose = require('mongoose');
// const Book = require('./models/Book'); // Assuming the Mongoose schema is defined in a separate file called "Book.js"
// const jsonData = require('./book.json'); // Assuming the JSON data is stored in a file called "books.json"




// Connect to the MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/zoroBook', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
//     // Add the JSON data to the database
//     Book.insertMany(jsonData)
//       .then(() => {
//         console.log('Data added successfully');
//         mongoose.connection.close();
//       })
//       .catch((error) => {
//         console.error('Error adding data:', error);
//         mongoose.connection.close();
//       });
//   })
//   .catch((error) => {
//     console.error('Error connecting to the database:', error);
//   });



const { Book } = require('./models/Book');
const { Review } = require('./models/Review');

// Function to add comment and review by book ID
async function addCommentAndReview(bookId, comment, rating) {
  try {
    // Find the book by ID
    const book = await Book.findById(bookId);
  
    if (!book) {
      throw new Error('Book not found');
    }
  
    // Create a new review
    const review = new Review({
      book: book._id,
      rating: rating,
      comments: [comment]
    });
  
    // Save the review
    const savedReview = await review.save();
  
    // Update the book's review field with the saved review ID
    book.review = savedReview._id;
  
    // Save the updated book
    await book.save();
  
    console.log('Comment and review added successfully');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example usage:
const bookId = '607e89179a4a2b32e453a6c5'; // Replace with the actual book ID
const comment = 'Great book!';
const rating = {
  one: 0,
  two: 0,
  three: 0,
  four: 0,
  five: 1
};

addCommentAndReview(bookId, comment, rating);
