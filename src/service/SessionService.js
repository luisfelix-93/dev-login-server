const jwt = require('jsonwebtoken');
const {checkPassword} = require('../service/auth');
const authConfig = require('../config/auth');
const User = require('../models/User');
const Session = require('../models/Session');

class SessionService {
    async createSession(userName, password) {
        const user = User.findOne({userName});
        if (!user){ 
            return ("user/password not found!");
        }

        if(!checkPassword(user, password)) {
            return ("user/password not found!");
        }

        const idUser = user.id;
        const dataAtual = new Date();
        // Options for getting local information
        const opcoesLocais = { timeZone: 'America/Sao_Paulo', hour12: false };

         // Formatting the date with local information
        const formatoData = new Intl.DateTimeFormat('pt-BR', opcoesLocais);
        const dateSession = formatoData.format(dataAtual);

        const token = jwt.sign(idUser, authConfig.secret, {
        expiresIn: authConfig.expiresIn
        })

        let session = { 
            idUser,
            nmUser: userName,
            token,
            expiresIn: authConfig.expiresIn, 
            dateSession
        };

        session = new Session(session);
        await  session.save();
        return session;
    }
}

module.exports = new SessionService();