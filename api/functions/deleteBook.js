const Books = require('../models/Books');
module.exports = (req, res) => {
    const { id } = req.body;
    Books.destroy({ where: { id: id } })
        .then(() => {
            res.status(200).json({
                message: "Le livre a bien été supprimé de la bibliothèque"
            })
        }).catch(err => {
            res.status(500).json({
                message: "Erreur lors de la suppression du livre",
                error: err.message
            })
        })
}