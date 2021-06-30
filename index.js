//importing express
const express = require("express");

//importing database
const database = require("./database");

//intialization
const booky = express();

//configuration
booky.use(express.json());
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

//API
/*
Route            /book/add
Description      add new book
Access           PUBLIC
Parameter        NONE
Methods          POST
 */

booky.post("/book/add", (req,res) =>{

    const {newBook} = req.body;
    database.books.push(newBook);

    return res.json({books:database.books});

});

//API
/*
Route            /author/add
Description      add new author
Access           PUBLIC
Parameter        NONE
Methods          POST
 */

booky.post("/author/add", (req,res) =>{

    const {newAuthor} = req.body;
    database.author.push(newAuthor);

    return res.json({authors:database.author});

});

//API
/*
Route            /publication/add
Description      add new publication
Access           PUBLIC
Parameter        NONE
Methods          POST
 */

booky.post("/publication/add", (req,res) =>{

    const {newPublication} = req.body;
    database.publication.push(newPublication);

    return res.json({publications:database.publication});

});

//API
/*
Route            /book/update/title
Description      update book titile
Access           PUBLIC
Parameter        isbn
Methods          PUT
 */

booky.put("/book/update/title/:isbn", (req,res) =>{

    database.books.forEach((book) =>{
        if(book.ISBN===req.params.isbn)
        {
            book.title = req.body.newBookTitle;
            return;
        }
    });

    return res.json({books:database.books});

});

//API
/*
Route            /book/update/author
Description      Update/add new author
Access           PUBLIC
Parameter        isbn
Methods          PUT
 */

booky.put("/book/update/author/:isbn/:authorId", (req,res) =>{

    //updating book database
    database.books.forEach((book) =>{

        if(book.ISBN===req.params.isbn)
        {
            return book.author.push(parseInt(req.params.authorId));
        }
    });

    //updating author database
    database.author.forEach((author) =>{

        if(author.id===parseInt(req.params.authorId))
        {
            return author.books.push(req.params.isbn);
        }
    });

    return res.json({books:database.books, author:database.author});

});

//API
/*
Route            /author/update/name
Description      Update author name
Access           PUBLIC
Parameter        id
Methods          PUT
 */

booky.put("/author/update/name/:id", (req,res) =>{

    database.author.forEach((author) =>{
        if(author.id===parseInt(req.params.id))
        {
            author.name = req.body.newAuthorName;
            return;
        }
    });

    return res.json({authors:database.author});

});

//API
/*
Route            /publication/update/name
Description      Update the publication's name
Access           PUBLIC
Parameter        id
Methods          PUT
 */

booky.put("/publication/update/name/:id", (req,res) =>{

    database.publication.forEach((publication) =>{
        if(publication.id===parseInt(req.params.id))
        {
            publication.name = req.body.newPublicationName;
            return;
        }
    });

    return res.json({publications:database.publication});

});

//API
/*
Route            /publication/update/book
Description      Update/add books to publications
Access           PUBLIC
Parameter        isbn
Methods          PUT
 */

booky.put("/publication/update/book/:isbn" ,(req,res) =>{

    //update the publication database
    database.publication.forEach((publication) =>{
        if(publication.id===req.body.pubId)
        {
            return publication.books.push(req.params.isbn);
        }
    });

    //updating books database
    database.books.forEach((book) =>{
        if(book.ISBN===req.params.isbn)
        {
            book.publications = req.body.pubId;
            return;
        }
    });

    return res.json({books:database.books,
        publications:database.publication,message:"Successfully updated publication"});

});

booky.listen(3000, () => console.log("Hey, server is running!👏"));

