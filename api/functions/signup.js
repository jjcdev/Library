const { User } = require("../models");
const { hashPassword } = require('../utils/auth');

module.exports = async(req, res) => {
    try {
        const { lastname, firstname, email, password } = req.body;

        const exist = await User.findOne({ where: { email } });

        if (exist) {
            return res.status(400).json({
                success: false,
                message: "Email invalide ou déjà utilisé!"
            });
        }

        const passHash = await hashPassword(password);

        await User.create({
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: passHash
        });

        return res.status(200).json({
            success: true,
            message: 'Inscription réussie'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Erreur lors de l'inscription!"
        });
    }
};