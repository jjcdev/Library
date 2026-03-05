const Token = require('../models/Token');
const { generateToken, generateRefreshToken } = require('../utils/auth');

module.exports = async(req, res) => {
    try {
        const oldRToken = req.body.refreshToken;

        const tokenFound = await RefreshToken.findOne({ where: { token: oldRToken } });

        if (!tokenFound || RefreshToken.verifyExpiration(tokenFound)) {
            if (tokenFound) await tokenFound.destroy();
            return res.status(403).json({ error: "Session expirée, reconnectez-vous." });
        }

        const userId = tokenFound.userId;
        const newAToken = generateToken(userId);
        const newRTokenString = generateRefreshToken(userId);

        await tokenFound.destroy();
        await RefreshToken.create({
            token: newRTokenString,
            userId: userId
        });

        res.status(200).json({
            accessToken: newAToken,
            refreshToken: newRTokenString
        });

    } catch (error) {
        res.status(500).json({ error: "Erreur lors du rafraîchissement" });
    }
};