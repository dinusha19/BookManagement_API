//Prefix :  /book

//Initializing express Roter
const Router = require("express").Router();

//Book Model
const BookModel = require("../../database/book");

//API
/*
Route            /
Description      Get all books
Access           PUBLIC
Parameter        NONE
Methods          GET
 */

Router.get("/", async (req, res) => {

    const getAllBooks = await BookModel.find();
    return res.json({ books: getAllBooks });
});

//API
/*
Route            /is
Description      Get specific number of books based on ISBN
Access           PUBLIC
Parameter        ISBN
Methods          GET
 */
Router.get("/is/:isbn", async (req, res) => {

    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });
    //It will return NULL -> False

    if (!getSpecificBook) {
        return res.json({ error: `No book found for the ISBN of ${req.params.isbn}` });
    }

    return res.json({ book: getSpecificBook });
});

//API
/*
Route            /c
Description      Get specific number of books based on category
Access           PUBLIC
Parameter        category
Methods          GET
 */
Router.get("/c/:category", async (req, res) => {

    const getSpecificBook = await BookModel.findOne({ category: req.params.category })

    if (!getSpecificBook) {
        return res.json({ error: `No book found for the category of ${req.params.category}` });
    }

    return res.json({ book: getSpecificBook });
});


//API
/*
Route            /l
Description      Get specific number of books based on language
Access           PUBLIC
Parameter        language
Methods          GET
 */
Router.get("/l/:language", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ language: req.params.language });

    if (!getSpecificBook) {
        return res.json({ error: `No book found for the language of ${req.params.language}` });
    }

    return res.json({ book: getSpecificBook });
});

//API
/*
Route            /book/add
Description      add new book
Access           PUBLIC
Parameter        NONE
Methods          POST
 */

Router.post("/add", async (req, res) => {

    const { newBook } = req.body;
    BookModel.create(newBook);

    return res.json({ message: "added new book" });

});

//API
/*
Route            /book/update/title
Description      update book titile
Access           PUBLIC
Parameter        isbn
Methods          PUT
 */

Router.put("/update/title/:isbn", async (req, res) => {

    const updateBook = await BookModel.findOneAndUpdate(
        { ISBN: req.params.isbn },
        { title: req.body.newBookTitle },
        { new: true }  //to get updated data
    );

    return res.json({ book: updateBook });

});


//API
/*
Route            /book/update/author
Description      Update/add new author
Access           PUBLIC
Parameter        isbn
Methods          PUT
 */

Router.put("/update/author/:isbn", async (req, res) => {

    //updating book database
    const updateBook = await BookModel.findOneAndUpdate(
        { ISBN: req.params.isbn },
        {
            $addToSet: {
                author: req.body.newAuthor
            }
        },
        { new: true }
    );

    //updating author database
    const updateAuthor = await AuthorModel.findOneAndUpdate(
        { id: req.body.newAuthor },
        {
            $addToSet: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    );

    return res.json({ books: updateBook, author: updateAuthor });

});

//API
/*
Route            /book/delete
Description      delete a book
Access           PUBLIC
Parameter        isbn
Methods          DELETE
 */

Router.delete("/delete/:isbn", async (req, res) => {

    const updatedBookDatabase = await BookModel.findOneAndDelete({ ISBN: req.params.isbn });
    return res.json({ books: database.books });
});

//API
/*
Route            /book/delete/author
Description      Delete an author of a book
Access           PUBLIC
Parameter        isbn
Methods          DELETE
 */

Router.delete("/delete/author/:isbn/:authorId", async (req, res) => {
    //update the book database
    const updatedBook = await BookModel.findOneAndUpdate(
        { ISBN: req.params.isbn },
        {
            $pull: {
                author: parseInt(req.params.authorId)

            }
        },
        { new: true }
    );

    //update the author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        { id: parseInt(req.params.authorId) },
        {
            $pull: {
                books: req.params.isbn
            }
        },
        {
            new: true
        });

    return res.json({
        books: updatedBook,
        message: "author deleted",
        author: updatedAuthor
    });

});


module.exports = Router;