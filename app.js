const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth'); 

dotenv.config({ path: './.env' });

const app = express();

const PublicDirectory = path.join(__dirname, './public');
app.use(express.static(PublicDirectory));

// React build directory
const reactBuildDirectory = path.join(__dirname, './dist');
app.use('/to-dos', express.static(reactBuildDirectory));

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(cookieParser());

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            fontSrc: ["'self'", "data:"],
            imgSrc: ["'self'", "data:"],
            connectSrc: ["'self'"],
            frameSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            childSrc: ["'self'"]
        }
    }
}));

// Middleware to check JWT and set req.user
app.use((req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.locals.isAuthenticated = false;
                return next();
            } else {
                req.user = decoded.id;
                res.locals.isAuthenticated = true;
                return next();
            }
        });
    } else {
        res.locals.isAuthenticated = false;
        next();
    }
});

// Routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.render('index'); 
});

app.get('/Contact-us', (req, res) => {
    res.render('Contact_us');
});

app.get('/to-dos/*', (req, res) => {
    res.sendFile(path.join(reactBuildDirectory, 'index.html')); 
});

app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(5001, () => {
    console.log(`Server is running on http://localhost:5001`);
});
