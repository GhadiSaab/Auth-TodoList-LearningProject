const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/to-dos', (req, res) => {
    res.render('To_dos');
});

router.get('/Contact-us', (req,res) => {
    res.render('Contact_us');
})



module.exports = router;
