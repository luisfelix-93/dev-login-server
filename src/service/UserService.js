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

    async registerUser(userName, fullName, email, password) {
        try{
            const user = {userName, fullName, email, password}
            const newUser = new User(user);
            await newUser.save();
            return newUser;
        } catch(error) {
            console.error('Error: ', error);
            throw error;
        }
    }

    // async registerUser(userName, fullName, email, password) {
    //     try {
    //         const user = {userName, fullName, email, password}
    //         const newUser = new User(user);
    //         await newUser.save();
    //         return newUser;
    //     } catch(error){
    //         console.error('Error: ', error);
    //         throw error;
    //     }
    // }
}

module.exports = new UserService();