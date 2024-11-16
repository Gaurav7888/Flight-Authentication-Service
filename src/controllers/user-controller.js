const { response } = require('express')
const UserService =  require('../services/user-services');

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        })

        return res.status(201).json({
            message:"Successfuly created User",
            data: response,
            success: true,
            err: {}
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong in controller layer",
            data: {},
            success: false,
            err: error
        });
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(
            req.body.email,
            req.body.password
        );

        return res.status(200).json({
            message:"Successfuly SignIn User",
            data: response,
            success: true,
            err: {}
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong in controller layer",
            data: {},
            success: false,
            err: error
        });
    }
}

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = userService.isAuthenticated(token);
        return res.status(200).json({
            message:"Successfuly SignIn User",
            data: response,
            success: true,
            err: {}
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong in controller layer",
            data: {},
            success: false,
            err: error
        });
    }
}
module.exports = {
    create,
    signIn,
    isAuthenticated
}