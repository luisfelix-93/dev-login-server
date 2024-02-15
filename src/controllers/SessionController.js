const sessionService = require('../service/SessionService');

class SessionController {
    async create(req, res) {
        const {userName, password} = req.body;

        try{
            const session = await sessionService.createSession(userName, password);
            res.status(200).json(session);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports =  new SessionController;