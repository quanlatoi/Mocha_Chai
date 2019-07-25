let Book = require("../model/book");

/*
 * GET /books route to retrieve all the books.
 */
let getBooks = (req, res) => {
    Book.find((err, books) => {
        if (err) {
            res.send(err); // :D
            return;
        }
        res.send(books);
    });
};

/*
 * POST /books to save a new book.
 */
let postBook = (req, res) => {
    let book = req.body;
    Book.save(book, (err, newBook) => {
        if(err) {
            res.send(err);
            return;
        }
        res.send({
            message: "Book successfully added!",
            book: newBook
        });
    });
};

/*
 * GET /books/:id route to retrieve a book given its id.
 */
let getBook = (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if(err) {
            res.send(err);
            return;
        }
        res.send({
            book
        });
    })
};

/*
 * DELETE /books/:id to delete a book given its id.
 */
let deleteBook = (req, res) => {
    Book.delete(req.params.id, (err, result) => {
        res.json({
            message: "Book successfully deleted!",
            result
        });
    })
};

/*
 * PUT /books/:id to update a book given its id
 */
let updateBook = (req, res) => {
    Book.update(req.params.id, req.body, (err, book) => {
        if(err) {
            res.send(err);
            return;
        }
        res.send({
            message: "Book updated!",
            book
        });
    })
};

//export all the functions
module.exports = {
    getBooks,
    postBook,
    getBook,
    deleteBook,
    updateBook
};