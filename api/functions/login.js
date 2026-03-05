const { User } = require("../models");
const Token = require("../models/Token");
const { verifyPassword, generateToken, generateRefreshToken } = require('../utils/auth');

module.exports = async(req, res) => {
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
                return res.status(400).json({
                    success: false,
                    message: "Une erreur s'est produite"
                })
            }
            return res.status(200).json({
                message: "Connexion réussie",
                token: token,
                user: us
            });
        } else {
            return res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
        }

    } catch (error) {
        // Toujours gérer les erreurs pour éviter que le serveur ne crash
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};