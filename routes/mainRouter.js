const express = require("express");
const mainRouter = express.Router();
const bodyParser = require("body-parser");

const User = require('../models/user');

mainRouter.use(bodyParser.json());

mainRouter.get('/', (req, res) => {
    res.render('home.hbs', { });
});

mainRouter.get('/first', (req, res) => {
    res.render('first.hbs', { });
});

mainRouter.post('/first', (req, res) => {
    console.log(req.body);
    var user = new User(req.body);
    user.save()
        .then((user) => {
           res.send(user);
        })
});

mainRouter.get('/more', (req, res) => {
    res.render('more.hbs', { });
});

mainRouter.get('/robots.txt', (req, res) => {
    res.redirect('/pages/robots.txt');
});

mainRouter.get('/sitemap.xml', (req, res) => {
    res.redirect('/pages/sitemap.xml');
});

module.exports = mainRouter;
