const mongoose = require("mongoose");

//creating Author schema
const AuthorSchema = mongoose.Schema({
    id:Number,
    name:String,
    books:[String],
});

//creating Model
const AuthorModel = mongoose.model(AuthorSchema);

module.exports = AuthorModel;