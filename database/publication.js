const mongoose = require("mongoose");

//creating Publication schema
const PublicationSchema = mongoose.Schema({
    id:Number,
    name:String,
    books:[String],
});

//creating Model
const PublicationModel = mongoose.model("publications",PublicationSchema);

module.exports = PublicationModel;