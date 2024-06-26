const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const UserService = require('./UserService');
const Session = require('../models/Session');

class SessionService {
    async createSession(userName, password) {
        const findUser = await UserService.getUserByUserName(userName, password);
        
        if (!findUser) {
            return { error: 'User / password inválido' };
        }

        const opcoesLocais = { timeZone: 'America/Sao_Paulo', hour12: false };
        const dataAtual = new Date();
        // Formatting the date with local information
       const formatoData = new Intl.DateTimeFormat('pt-BR', opcoesLocais);
       const dateSession = formatoData.format(dataAtual);

        const idUser = findUser.id;
        
        const token = jwt.sign({ idUser }, authConfig.secret, {
            expiresIn: 3600
        });

        const session = new Session({
            idUser,
            userName,
            token,
            dtSession: dateSession
        });

        await session.save();
        return session;
    }
}

module.exports = new SessionService();