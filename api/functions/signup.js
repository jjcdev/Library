const Users = require("../models/Users")
module.exports = (req, res) => {
    const { lastname, firstname, email, password } = req.body
    const exist = Users.findOne({ where: { email: email } })
    if (exist) {
        res.status(500).json({
            success: false,
            message: "Email invalide ou déjà utilisé!"
        })
    }
    const passHash = require('../utils/auth').hashPassword(password)
    const newUser = Users.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        })
        .then(user => {
            res.status(200).json({
                success: true,
                message: 'Inscription réussie'
            })
        }).catch(user => {
            res.status(500).json({
                success: false,
                message: "Erreur lors de l'inscription!"
            })
        })
    return newUser
}