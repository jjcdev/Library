const express = require('express');
const Token = require('../models/Token');
// Vérification de la validité du Token passé dans le headers
module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Méthode non autorisée'
        })
    }
    if (!Token.findOne({ where: { token: token } })) {
        return res.status(401).json({
            success: false,
            message: 'Token invalide'
        })
    }
    next();
}