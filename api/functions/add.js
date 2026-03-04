const Books = require("../models").Books;
module.exports = (req, res) => {
    const { name, author, size, year } = req.body;
    const newBook = Books.create({
            title: name,
            author: author,
            size: size,
            editingYear: year
        })
        .then(book => {
            res.status(200).json({
                message: "Le livre a bien été ajouté à la bibliothèque",
                book: book
            })
        }).catch(err => {
            res.status(500).json({
                message: "Le livre n'a pas pu être ajouté à la bibliothèque",
                error: err.message
            })
        })
    return newBook
}