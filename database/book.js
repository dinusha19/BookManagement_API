const mongoose = require("mongoose");

//creating a book schema
const BookSchema = mongoose.Schema({
    
    ISBN:String,
    title:String,
    pubDate:String,
    language:String,
    numPage:Number,
    author:[Number],
    publications:Number,
    category:[String],

});

//creating a book model
const BookModel = mongoose.model(BookSchema);

module.exports = BookModel;