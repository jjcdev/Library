const Books = require('../models/Books')
module.exports = (req, res) => {
    Books.findAll()
        .then(books => {
            res.status(200).json({
                message: "Liste des livres",
                books: books
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "Erreur lors de la récupération des livres",
                error: err.message
            })
        })
}