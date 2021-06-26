//importing express
const express = require("express");

//importing database
const database = require("./database");

//intialization
const booky = express();

//API
/*
Route            /
Description      Get all books
Access           PUBLIC
Parameter        NONE
Methods          GET
 */

booky.get("/", (req,res) =>{

    return res.json({books:database.books});
});

//API
/*
Route            /is
Description      Get specific number of books based on ISBN
Access           PUBLIC
Parameter        ISBN
Methods          GET
 */
booky.get("/is/:isbn", (req,res) =>{
    const getSpecificBook = database.books.filter((book) => book.ISBN===req.params.isbn);

    if(getSpecificBook.length===0)
    {
        return res.json({error:`No book found for the ISBN of ${req.params.isbn}`});
    }

    return res.json({book:getSpecificBook});
});

//API
/*
Route            /c
Description      Get specific number of books based on category
Access           PUBLIC
Parameter        category
Methods          GET
 */
booky.get("/c/:category", (req,res) => {
    const getSpecificBook = database.books.filter((book) =>
    book.category.includes(req.params.category));

    if(getSpecificBook.length===0)
    {
        return res.json({error:`No book found for the category of ${req.params.category}`});
    }

    return res.json({book:getSpecificBook});
});


//API
/*
Route            /l
Description      Get specific number of books based on language
Access           PUBLIC
Parameter        language
Methods          GET
 */
booky.get("/l/:language", (req,res) =>{
    const getSpecificBook = database.books.filter((book) => book.language===req.params.language);

    if(getSpecificBook.length===0)
    {
        return res.json({error:`No book found for the language of ${req.params.language}`});
    }

    return res.json({book:getSpecificBook});
})

//API
/*
Route            /author
Description      Get all authors
Access           PUBLIC
Parameter        NONE
Methods          GET
 */

booky.get("/author", (req,res) =>{

    return res.json({authors:database.author});
});

//API
/*
Route            /author/id
Description      Get specific authors based on id
Access           PUBLIC
Parameter        aid
Methods          GET
 */
booky.get("/author/id/:aid", (req,res) =>{
    const getSpecificAuthor = database.author.filter((author) => author.id===parseInt(req.params.aid));

    if(getSpecificAuthor.length===0)
    {
        return res.json({error:`No author found for the book of ${req.params.aid}`});
    }

    return res.json({authors:getSpecificAuthor});
});


//API
/*
Route            /author/book
Description      Get authors based on book
Access           PUBLIC
Parameter        isbn
Methods          GET
 */
booky.get("/author/book/:isbn", (req,res) => {
    const getSpecificAuthor = database.author.filter((author) =>
    author.books.includes(req.params.isbn));

    if(getSpecificAuthor.length===0)
    {
        return res.json({error:`No author found for the book of ${req.params.isbn}`});
    }

    return res.json({authors:getSpecificAuthor});
});

//API
/*
Route            /publication
Description      Get all publications
Access           PUBLIC
Parameter        NONE
Methods          GET
 */

booky.get("/publications", (req,res) => {
    return res.json({publications:database.publication});
});

//API
/*
Route            /publication/id
Description      Get specific publications 
Access           PUBLIC
Parameter        pid
Methods          GET
 */

booky.get("/publications/id/:pid", (req,res) => {
    const getSpecificPublications = database.publication.filter((publication) =>publication.id===parseInt(req.params.pid));

    if(getSpecificPublications.length===0)
    {
        return res.json({error:`No publications found for publication id ${req.params.pid}`});
    }

    return res.json({publications:getSpecificPublications});
});

//API
/*
Route            /publication/books
Description      Get specific publications based on isbn
Access           PUBLIC
Parameter        isbn
Methods          GET
 */

booky.get("/publications/books/:isbn", (req,res) => {
    const getSpecificPublications = database.publication.filter((publication) =>
    publication.books.includes(req.params.isbn));

    if(getSpecificPublications.length===0)
    {
        return res.json({error:`No publications found based on ${req.params.isbn}`});
    }

    return res.json({publications:getSpecificPublications});
});

booky.listen(3000, () => console.log("Hey, server is running!👏"));

