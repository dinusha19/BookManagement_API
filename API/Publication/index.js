const Router = require("express").Router();

const PublicationModel = require("../../database/publication");

//API
/*
Route            /publication
Description      Get all publications
Access           PUBLIC
Parameter        NONE
Methods          GET
 */

Router.get("", async (req, res) => {

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

Router.get("/id/:pid", async (req, res) => {

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

Router.get("/books/:isbn", async (req, res) => {
    const getSpecificPublications = await PublicationModel.findOne({ books: req.params.isbn });

    if (!getSpecificPublications) {
        return res.json({ error: `No publications found based on ${req.params.isbn}` });
    }

    return res.json({ publications: getSpecificPublications });
});

//API
/*
Route            /publication/add
Description      add new publication
Access           PUBLIC
Parameter        NONE
Methods          POST
 */

Router.post("/add", async (req, res) => {

    const { newPublication } = req.body;
    PublicationModel.create(newPublication);

    return res.json({ message: "added new publication" });

});

//API
/*
Route            /publication/update/name
Description      Update the publication's name
Access           PUBLIC
Parameter        id
Methods          PUT
 */

Router.put("/update/name/:id", async (req, res) => {

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

Router.put("/update/book/:isbn", async (req, res) => {

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
Route            /publication/delete
Description      delete a publication
Access           PUBLIC
Parameter        id
Methods          DELETE
 */

Router.delete("/delete/:id", async (req, res) => {

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
Router.delete("/delete/book/:isbn/:pubId", async (req, res) => {

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

module.exports = Router;