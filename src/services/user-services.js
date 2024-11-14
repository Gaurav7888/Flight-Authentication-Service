const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const res = require('express/lib/response');
const bcrypt = require("bcrypt");

class UserService {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something is wrong on Service layer");
            throw(error);
        }
    }

    async delete(userId){
        try {
            await this.userRepository.destroy({
                where : {
                    id:userId
                }
            }) 
        } catch (error) {
            console.log("Something is wrong on Service layer");
            throw(error);
        }
    } 

    createToken(user){
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: 30});
            return result;
        } catch (error) {
            console.log("Something is wrong in Token Creation");
            throw(error);
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something is wrong in Token Verification part");
            throw(error);
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword ){
        try {
            const response = bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
            return response;
        } catch (error) {
            console.log("Something is wrong in Token Verification part");
            throw(error);
        }
    }

}

module.exports = UserService;