const mongoose = require('mongoose');

// TODO: Define a new schema named `bookSchema`
const bookSchema = new mongoose.Schema({
	title: { type: String, required: true },
	author: String,
	price: Number,
})

// TODO: Create a custom instance method named `getDiscount`
bookSchema.methods.getDiscount = function() {
	this.price = this.price / 2
	console.log(this.price)
}

// TODO: Create a model named `Book`
const Book = mongoose.model("Book", bookSchema)

// TODO: Create a new instance of the model
const discountedBook = new Book(
	{
		title: "The Book",
		author: "Christian",
		price: 16,
	}
)

// TODO: Call the custom instance method on the instance
discountedBook.getDiscount()

module.exports = Book;
