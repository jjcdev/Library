const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ error: "Token manquant" });
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'BT75G5Z9O22OP2');
        req.auth = { userId: decodedToken.id };
        next();
    } catch (error) {
        res.status(401).json({ error: "Requête non authentifiée" });
    }
};