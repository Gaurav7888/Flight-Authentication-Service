const { User } = require("../models/index");

class UserRepository {

    async create(data) 
    {
            try {
                const user = await User.create(data);
                return user;
            }
            catch (error) {
                console.log("Something is wrong on Repository layer");
                throw(error);
            }
    }

    async destroy(userId) 
    {
            try {
                await User.destroy({
                    where: {
                        id: userId
                    }
                })
                return true;
            }
            catch (error) {
                console.log("Something is wrong on Repository layer");
                throw(error);
            }
    }

    async getById(userId) 
    {
            try {
                const user = await User.findByPK(userId, {
                    attributes: ['email', 'id']
                });
                return user;
            } catch (error) {
                console.log("Something is wrong on Repository layer");
                throw(error);
            }
    }

}

module.exports = UserRepository;
