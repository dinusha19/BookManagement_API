const Router = require("express").Router();

const AuthorModel = require("../../database/author");

//API
/*
Route            /author
Description      Get all authors
Access           PUBLIC
Parameter        NONE
Methods          GET
 */

Router.get("", async (req, res) => {

    const getAllAuthors = await AuthorModel.find();

    return res.json({ authors: getAllAuthors });
});

//API
/*
Route            /author/id
Description      Get specific authors based on id
Access           PUBLIC
Parameter        aid
Methods          GET
 */
Router.get("/id/:aid", async (req, res) => {

    const getSpecificAuthor = await AuthorModel.findOne({ id: parseInt(req.params.aid) });
    //It will return NULL -> False

    if (!getSpecificAuthor) {
        return res.json({ error: `No author found for the AuthorID of ${req.params.aid}` });
    }

    return res.json({ authors: getSpecificAuthor });
});


//API
/*
Route            /author/book
Description      Get authors based on book
Access           PUBLIC
Parameter        isbn
Methods          GET
 */
Router.get("/book/:isbn", async (req, res) => {
    const getSpecificAuthor = await AuthorModel.findOne({ books: req.params.isbn });

    if (!getSpecificAuthor) {
        return res.json({ error: `No author found for the book of ${req.params.isbn}` });
    }

    return res.json({ authors: getSpecificAuthor });
});

//API
/*
Route            /author/add
Description      add new author
Access           PUBLIC
Parameter        NONE
Methods          POST
 */

Router.post("/add", async (req, res) => {

    const { newAuthor } = req.body;
    AuthorModel.create(newAuthor);

    return res.json({ message: "Added new author!" });

});

//API
/*
Route            /author/update/name
Description      Update author name
Access           PUBLIC
Parameter        id
Methods          PUT
 */

Router.put("/update/name/:id", async (req, res) => {

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        { id: parseInt(req.params.id) },
        { name: req.body.newAuthorName },
        { new: true }  //to get updated data
    );


    return res.json({ authors: updatedAuthor });

});

//API
/*
Route            /author/delete
Description      delete a author
Access           PUBLIC
Parameter        id
Methods          DELETE
 */

Router.delete("/delete/:id", async (req, res) => {

    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({ id: parseInt(req.params.id) });
    return res.json({ Authors: updatedAuthorDatabase });
});


module.exports = Router;