const express = require('express');
const userController = require('../../controllers/user-controller');
const { AuthValidator } = require("../../middlewares/index");
const router = express.Router();

router.post(
    '/signup', 
    AuthValidator.validateAuth,
    userController.create
);
router.post(
    '/signin', 
    AuthValidator.validateAuth,
    userController.signIn
);
router.get(
    '/isAuthenticated', 
    userController.isAuthenticated
);

router.get(
    "/isAdmin", 
    AuthValidator.validateIsAdminRequest, 
    userController.isAdmin);


module.exports = router;