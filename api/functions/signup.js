const { User } = require("../models");
const { hashPassword } = require('../utils/auth');
const validator = require('validator');

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
module.exports = async(req, res, next) => {
    try {
        const { lastname, firstname, email, password } = req.body;
        const cleanEmail = validator.normalizeEmail(email) || email;
        if (!validator.isEmail(cleanEmail)) {
            const error = new Error("Email invalide ou déjà utilisé !")
            error.status = 400;
            throw error;
        }

        const exist = await User.findOne({ where: { email } });

        if (exist) {
            const error = new Error("Email invalide ou déjà utilisé!")
            error.status = 400;
            throw error;
        }

        const passHash = await hashPassword(password);

        await User.create({
            firstName: firstname,
            lastName: lastname,
            email: cleanEmail,
            password: passHash
        });

        return res.status(201).json({
            success: true,
            message: 'Inscription réussie'
        });

    } catch (error) {
        next(error)
    }
};