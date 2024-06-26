const sessionService = require('../service/SessionService');

class SessionController {
    async create(req, res) {
        const {userName, password} = req.body;

        try{
            const session = await sessionService.createSession(userName, password);

            if(session.error) {
                return res.status(401).json(session.error);
            }
            return res.status(200).json({
                message: 'Usuário autenticado com sucesso',
                data: session 
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports =  new SessionController;