const { users } = require('../models'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register controller 
const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await users.findOne({ where: { email } });
        if (existingUser) {
            return res.render('index', { message: 'That email is already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        await users.create({ email, password: hashedPassword });
        res.render('index', { message: 'Registration successful' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Server error');
    }
};

// Login controller 
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await users.findOne({ where: { email } });
        if (!user) {
            return res.render('index', { message: 'Email not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('index', { message: 'Password is incorrect' });
        }

        
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });


        res.cookie('token', token, { httpOnly: true });

        res.redirect('/');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).render('index', { message: 'Error during login' });
    }
};

module.exports = {
    register,
    login
};
