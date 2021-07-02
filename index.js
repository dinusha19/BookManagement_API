require("dotenv").config();

//importing express framework
const express = require("express");

//importing mongoose framework
const mongoose = require("mongoose");

//importing database
const database = require("./database/database");

//Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");
const { findOneAndDelete } = require("./database/book");

//intialization
const booky = express();

//configuration
booky.use(express.json());

//established database connection
mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
).then(() => console.log("Connection established"));



//API
/*
Route            /
Description      Get all books
Access           PUBLIC
Parameter        NONE
Methods          GET
 */

booky.get("/", async (req, res) => {

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
booky.get("/is/:isbn", async (req, res) => {

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
booky.get("/c/:category", async (req, res) => {

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
booky.get("/l/:language", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ language: req.params.language });

    if (!getSpecificBook) {
        return res.json({ error: `No book found for the language of ${req.params.language}` });
    }

    return res.json({ book: getSpecificBook });
})

//API
/*
Route            /author
Description      Get all authors
Access           PUBLIC
Parameter        NONE
Methods          GET
 */

booky.get("/author", async (req, res) => {

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
booky.get("/author/id/:aid", async (req, res) => {

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
booky.get("/author/book/:isbn", async (req, res) => {
    const getSpecificAuthor = await AuthorModel.findOne({ books: req.params.isbn });

    if (!getSpecificAuthor) {
        return res.json({ error: `No author found for the book of ${req.params.isbn}` });
    }

    return res.json({ authors: getSpecificAuthor });
});

//API
/*
Route            /publication
Description      Get all publications
Access           PUBLIC
Parameter        NONE
Methods          GET
 */

booky.get("/publications", async (req, res) => {

    const getAllPublication = await PublicationModel.find();
    return res.json({ publications: getAllPublication });
});

//API
/*
Route            /publication/id
Description      Get specific publications 
Access           PUBLIC
Parameter        pid
Methods          GET
 */

booky.get("/publications/id/:pid", async (req, res) => {

    const getSpecificPublications = await PublicationModel.findOne({ id: parseInt(req.params.pid) });
    //It will return NULL -> False

    if (!getSpecificPublications) {
        return res.json({ error: `No publication found for the PublicationID of ${req.params.pid}` });
    }

    return res.json({ publications: getSpecificPublications });
});

//API
/*
Route            /publication/books
Description      Get specific publications based on isbn
Access           PUBLIC
Parameter        isbn
Methods          GET
 */

booky.get("/publications/books/:isbn", async (req, res) => {
    const getSpecificPublications = await PublicationModel.findOne({ books: req.params.isbn });

    if (!getSpecificPublications) {
        return res.json({ error: `No publications found based on ${req.params.isbn}` });
    }

    return res.json({ publications: getSpecificPublications });
});

//API
/*
Route            /book/add
Description      add new book
Access           PUBLIC
Parameter        NONE
Methods          POST
 */

booky.post("/book/add", async (req, res) => {

    const { newBook } = req.body;
    BookModel.create(newBook);

    return res.json({ message: "added new book" });

});

//API
/*
Route            /author/add
Description      add new author
Access           PUBLIC
Parameter        NONE
Methods          POST
 */

booky.post("/author/add", async (req, res) => {

    const { newAuthor } = req.body;
    AuthorModel.create(newAuthor);

    return res.json({ message: "Added new author!" });

});

//API
/*
Route            /publication/add
Description      add new publication
Access           PUBLIC
Parameter        NONE
Methods          POST
 */

booky.post("/publication/add", async (req, res) => {

    const { newPublication } = req.body;
    PublicationModel.create(newPublication);

    return res.json({ message: "added new publication" });

});

//API
/*
Route            /book/update/title
Description      update book titile
Access           PUBLIC
Parameter        isbn
Methods          PUT
 */

booky.put("/book/update/title/:isbn", async (req, res) => {

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

booky.put("/book/update/author/:isbn", async (req, res) => {

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
Route            /author/update/name
Description      Update author name
Access           PUBLIC
Parameter        id
Methods          PUT
 */

booky.put("/author/update/name/:id", async (req, res) => {

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        { id: parseInt(req.params.id) },
        { name: req.body.newAuthorName },
        { new: true }  //to get updated data
    );


    return res.json({ authors: updatedAuthor });

});

//API
/*
Route            /publication/update/name
Description      Update the publication's name
Access           PUBLIC
Parameter        id
Methods          PUT
 */

booky.put("/publication/update/name/:id", async (req, res) => {

    const updatedPublication = await PublicationModel.findOneAndUpdate(
        { id: parseInt(req.params.id) },
        { name: req.body.newPublicationName },
        { new: true }  //to get updated data
    );

    return res.json({ publications: updatedPublication });

});

//API
/*
Route            /publication/update/book
Description      Update/add books to publications
Access           PUBLIC
Parameter        isbn
Methods          PUT
 */

booky.put("/publication/update/book/:isbn", async (req, res) => {

    //update the publication database
    const updatedPublication = await PublicationModel.findOneAndUpdate(
        { id: req.body.pubId },
        {
            $addToSet: {
                books: req.params.isbn
            }
        },
        { new: true }
    );


    //updating books database
    const updatedBook = await BookModel.findOneAndUpdate(
        { ISBN: req.params.isbn },
        {
            $addToSet: {
                publications: req.body.pubId
            }
        },
        {
            new: true
        }
    );

    return res.json({
        books: updateBook,
        publications: updatedPublication,
        message: "Successfully updated publication"
    });

});

//API
/*
Route            /book/delete
Description      delete a book
Access           PUBLIC
Parameter        isbn
Methods          DELETE
 */

booky.delete("/book/delete/:isbn", async (req, res) => {

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

booky.delete("/book/delete/author/:isbn/:authorId", async (req, res) => {
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

//API
/*
Route            /author/delete
Description      delete a author
Access           PUBLIC
Parameter        id
Methods          DELETE
 */

booky.delete("/author/delete/:id", async (req, res) => {

    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({ id: parseInt(req.params.id) });
    return res.json({ Authors: updatedAuthorDatabase });
});

//API
/*
Route            /publication/delete
Description      delete a publication
Access           PUBLIC
Parameter        id
Methods          DELETE
 */

booky.delete("/publication/delete/:id", async (req, res) => {

    const updatedPublicationDatabase = await PublicationModel.findOneAndDelete({ id: parseInt(req.params.id) });
    return res.json({ Publications: updatedPublicationDatabase });
});

//API
/*
Route            /publication/delete/book
Description      delete a book from publication
Access           PUBLIC
Parameter        isbn
Methods          DELETE
 */
booky.delete("/publication/delete/book/:isbn/:pubId", async (req, res) => {

    //updating publication database
    const updatedPublication = await PublicationModel.findOneAndUpdate(
        { id: parseInt(req.params.pubId) },
        {
            $pull: {
                books: req.params.isbn

            }
        },
        { new: true }
    );

    //update book database
    const updatedBook = await BookModel.findOneAndUpdate(
        { ISBN: req.params.isbn },
        {
            $pull: {
                publications: parseInt(req.params.pubId)
            }
        },
        {
            new: true
        });

    return res.json({ books: updatedBook, publications: updatedPublication });
});


booky.listen(3000, () => console.log("Hey, server is running!👏"));

