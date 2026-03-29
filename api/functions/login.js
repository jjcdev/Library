const { User } = require("../models");
const Token = require("../models/Token");
const { verifyPassword, generateToken, generateRefreshToken } = require('../utils/auth');

/**
 * Authentifie un utilisateur et génère les tokens d'accès.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
module.exports = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        const us = await User.findOne({ where: { email } });

        if (!us) {
            return res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
        }

        const verifPass = await verifyPassword(password, us.password);

        if (verifPass) {
            const token = generateToken(us.id);
            const rToken = generateRefreshToken(us.id)
            const registerToken = await Token.create({
                userId: us.id,
                token: rToken
            })
            if (!registerToken) {
                const error = new Error("Une erreur s'est produite!")
                error.status = 500
                throw error
            }

            const userResponse = {
                id: us.id,
                email: us.email,
                firstName: us.firstName,
                lastName: us.lastName
            };

            return res.status(200).json({
                message: "Connexion réussie",
                token: token,
                user: userResponse
            });
        } else {
            return res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
        }

    } catch (error) {
        next(error)
    }
};