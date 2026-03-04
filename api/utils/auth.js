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
        process.env.JWT_SECRET || 'BT75G5Z9O22OP2', { expiresIn: '1h' }
    );
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId },
        process.env.JWT_REFRESH_SECRET || 'U7E53F35F35T3534', { expiresIn: '30d' }
    );
};

module.exports = {
    hashPassword,
    verifyPassword,
    generateToken,
    generateRefreshToken
};