const mongoose = require ("mongoose");
const {Schema, model} = mongoose;

const bookSchema = Schema({
    _id: String,
    title: String,
    isbn: String,
    pageCount: Number,
    publishedDate: Date,
    stock: Number,
    shortDescription: String,
    authors: Array,
    categories: String,
    rating: Number,
    price: Number,
    imagen: String
});

module.exports = model("book", bookSchema, "books"); 
