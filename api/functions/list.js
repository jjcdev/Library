const Books = require('../models/Books')

/**
 * Récupère la liste complète des livres de la bibliothèque.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
module.exports = (req, res, next) => {
    Books.findAll()
        .then(books => {
            res.status(200).json({
                message: "Liste des livres",
                books: books
            })
        })
        .catch(err => {
            err.status = 500;
            next(err);
        })
}