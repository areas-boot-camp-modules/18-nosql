const mongoose = require('mongoose');

// TODO: Define a new schema named `bookSchema` for the subdocument
const bookSchema = new mongoose.Schema({
  title: {type: String, required: true },
  price: Number,
})

const librarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  //
  // TODO: Add the `books` subdocument to the parent document as an array
  //
  books: [bookSchema],
  lastAccessed: { type: Date, default: Date.now },
});

// TODO: Create a model named `Library`
const Library = mongoose.model("Library", librarySchema)

// TODO: Create a new instance of the model including the subdocuments
const bookData = [
  {
    title: "The Great American Novel",
    price: 100,
  },
  {
    title: "The Worst American Novel",
    price: 1,
  },
]

const newLibrary = new Library(
  {
    name: "Library of Congress",
    books: bookData,
  },
  (err, data) => {
    if (err) {
      console.error(err)
    } else {
      console.log
    }
  }
)

module.exports = Library;
