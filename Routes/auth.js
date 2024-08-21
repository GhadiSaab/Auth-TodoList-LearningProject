const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

// Middleware to redirect authenticated users
function redirectIfAuthenticated(req, res, next) {
    if (res.locals.isAuthenticated) {
        return res.redirect('/');
    }
    next();
}

// Register and Login routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/login', redirectIfAuthenticated, (req, res) => {
    res.render('login');
});

// Logout route
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;
