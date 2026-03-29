const Token = require('../models/Token');
const { generateToken, generateRefreshToken } = require('../utils/auth');

/**
 * Renouvelle le token d'accès en utilisant un refresh token valide.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
module.exports = async(req, res, next) => {
    try {
        const oldRToken = req.body.refreshToken;

        const tokenFound = await Token.findOne({ where: { token: oldRToken } });

        if (!tokenFound || Token.verifyExpiration(tokenFound)) {
            if (tokenFound) await tokenFound.destroy();
            const error = new Error("Votre session a expiré ! Merci de vous reconnecter.");
            error.status = 403;
            throw error
        }

        const userId = tokenFound.userId;
        const newAToken = generateToken(userId);
        const newRTokenString = generateRefreshToken(userId);

        await tokenFound.destroy();
        await Token.create({
            token: newRTokenString,
            userId: userId
        });

        res.status(200).json({
            accessToken: newAToken,
            refreshToken: newRTokenString
        });

    } catch (error) {
        next(error);
    }
};