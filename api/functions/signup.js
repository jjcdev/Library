const Users = require("../models/Users")
module.exports = (req, res) => {
    const { lastname, firstname } = req.body
    const newUser = Users.create({
            firstname: firstname,
            lastname: lastname
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