const User = require('../models/User');

class UserService {
    async getUserByUserName (userName, password) {
        try {
            return await User.findOne({ 
                userName, 
                password
            });

        } catch (error) {
            throw error;
        }
    }




}

module.exports = new UserService();