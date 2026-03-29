const Books = require('../models/Books');

/**
 * Supprime un livre de la bibliothèque par son ID.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
module.exports = (req, res, next) => {
    const { id } = req.body;
    Books.destroy({ where: { id: id } })
        .then(() => {
            res.status(200).json({
                message: "Le livre a bien été supprimé de la bibliothèque"
            })
        }).catch(err => {
            const error = new Error("Un problème est survenu lors de la suppression du livre ! Veuillez réessayer.");
            error.status = 500;
            next(error);
        })
}