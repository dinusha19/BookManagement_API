const books = [
    {
        ISBN:"12345Book",
        title:"Getting started with MERN",
        pubDate:"2021-06-25",
        language:"en",
        numPage:300,
        author:[1,2],
        publications:[1],
        category:["tech","programming","education","thriller"],

    },
];

const author = [
    {
        id:1,
        name:"dinusha",
        books:["12345Book","123456789Secreat"],
    },
    {
        id:2,
        name:"dinu",
        books:["12345Book"],
    }
];

const publication = [
    {
        id:1,
        name:"writex",
        books:["12345Book"]

    }
];

//we can call this file as a module

module.exports = {books,author,publication};