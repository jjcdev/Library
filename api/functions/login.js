const { User } = require('../models');
const { verifyPassword, generateToken } = require('../utils/auth');

module.exports = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(401).json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
        }

        const verifPass = await verifyPassword(password, user.password);

        if (verifPass) {
            const token = generateToken(user.id);
            return res.status(200).json({
                message: "Connexion réussie",
                token: token,
                user: user
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