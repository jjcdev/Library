const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const hashPassword = async(password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async(password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (userId) => {
    return jwt.sign({ id: userId },
        process.env.SJWT, { expiresIn: '1h' }
    );
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId },
        process.env.SRJWT, { expiresIn: '30d' }
    );
};

module.exports = {
    hashPassword,
    verifyPassword,
    generateToken,
    generateRefreshToken
};