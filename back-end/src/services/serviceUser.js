const fs = require('fs');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const httpException = require('../middleware/httpException');
const md5 = require('md5');


const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
};

const userLogin = async (email, password) => {
    const userCrypt = md5(password);
    const userInfo = await User.findOne({
        where: { email, password: userCrypt },
        attributes: {
            exclude: ['password', 'id'],
        },
    });
    
    return userInfo;
};

const generateToken = async ({ email, password }) => {
    const secret = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf8' });
    const payload = { email, password };
    const jwToken = jwt.sign(payload, secret, jwtConfig);
    return jwToken;
};

const createUser = async ({  email, name, password, role }) => {
    const existEmail = await User.findOne({ where: { email } });
    if (existEmail) throw httpException('Email exist in DB!', 409);

    const existName = await User.findOne({ where: { name } });
    if (existName) throw httpException('Name exist in DB!', 409);

    const userCreate = await User.create({ name, email, password: md5(password), role })

    return userCreate;
};
//Comentário

module.exports = {
    userLogin,
    generateToken,
    createUser,
};