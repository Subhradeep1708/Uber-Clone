const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { body } = require('express-validator')
const authMiddleware = require("../middlewares/auth.middleware");


router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('fullname').isLength({ min: 3 }).withMessage('Full name must be at least 3 characters long'),
], userController.registerUser)


router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], 
    userController.loginUser
)

router.get('/profile', authMiddleware.isUserAuthenticated ,userController.getUserProfile)

module.exports = router;