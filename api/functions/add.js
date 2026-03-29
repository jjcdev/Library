const Books = require("../models").Books;

/**
 * Ajoute un nouveau livre à la base de données.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
module.exports = async(req, res, next) => {
    try {
        const { name, author, size, year } = req.body;
        const book = await Books.create({
            title: name,
            author: author,
            size: size,
            editingYear: year
        });

        res.status(201).json({
            message: "Le livre a bien été ajouté à la bibliothèque",
            book: book
        });
    } catch (error) {
        const err = new Error("Le livre n'a pas pu être ajouté à la bibliothèque !");
        err.status = 500;
        next(err);
    }
}