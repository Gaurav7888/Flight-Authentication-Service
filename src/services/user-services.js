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

    async signIn(email, plainPassword){
        // step->1 fetch the user using the email
        // step->2 compare incoming password and stored encrypted password
        // step->3 if password matches then create a token and send it to user
        try {
            const user = this.userRepository.getByEmail(email);
            const passwordMatch = this.checkPassword(plainPassword, user.password);
            if (!passwordMatch) {
                console.log("Password Doesn't match");
                throw {error: "Incorrect password"};
            }

            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in the signin process");
            throw(error); 
        }

    }

    async isAuthenticated(token){

        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error: 'Invalid Token'}
            }
            const user = await this.userRepository.getById(response.id);
            if(!user){
                throw {error: 'User doesnt exist'}
            }
            return user.id;
            
        } catch (error) {
            console.log("Something went wrong in the auth process");
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