const mongoose = require('mongoose');
const { Schema } = mongoose;

const Book = new Schema({
  authors: [String],
  contents: String,
  datetime: Date,
  isbn: String,
  price: Number,
  publisher: String,
  sale_price: Number,
  status: String,
  thumbnail: String,
  title: String,
  translators: [String],
  url: String,
  type: String,
  grade: Number
});

Book.statics.findByIsbn = function(isbn) {
  return this.findOne({ isbn }).exec();
};

module.exports = mongoose.model('Book', Book);