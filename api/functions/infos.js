const User = require('../models/Users');

module.exports = async(req, res) => {
    try {
        const userId = req.auth.userId;
        const user = await User.findByPk(userId, {
            attributes: ['id', 'username', 'email']
        });
        if (!user) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération des infos" });
    }
};