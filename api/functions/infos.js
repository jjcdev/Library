const User = require('../models/Users');

/**
 * Récupère les informations de profil de l'utilisateur authentifié.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
module.exports = async(req, res, next) => {
    try {
        const userId = req.auth.userId;
        const user = await User.findByPk(userId, {
            attributes: ['id', 'username', 'email']
        });
        if (!user) {
            const error = new Error("Utilisateur introuvable! Vérifiez vos informations!");
            error.status = 403;
            throw error
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};