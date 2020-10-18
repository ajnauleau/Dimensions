const express = require("express");
const mainRouter = express.Router();
const bodyParser = require("body-parser");
const STRIPE_API = require('../api/stripe-functions.js');
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
        .then((err, user) => {
            if (err) {
                console.log('Error:', err)
            }
           res.send(user);
        })
    console.log('reached');
});

mainRouter.get('/list', (req, res) => {

    var arrayOfUsers = [];

    User.find({}, (err, data) => {
        for(let user of data) {
            console.log('user', user)
            arrayOfUsers.push([user.name, user.email]);
        }
    }).then(() => {
        res.render('list.hbs', { users: arrayOfUsers})
    });

    console.log('array', arrayOfUsers)


})

mainRouter.get('/more', (req, res) => {
    res.render('more.hbs', { });
});

var plan = {
    id: "plan_IDzFtiLVkpT2MO",
    amount: 1,
    name: 'Dimensions Subscription',
    interval: 'month',
    interval_count: 12
}

var product = {
    name: 'Dimensions Subscription'
}

mainRouter.get('/subscribe', (req, res) => {
    res.render('subscribe.hbs', {plan, product});
});

mainRouter.post('/processPayment', (req, res) => {
    var product = {
        name: req.body.productName
    };

    var plan = {
        id: req.body.planId,
        name: req.body.planName,
        amount: req.body.planAmount,
        interval: req.body.planInterval,
        interval_count: req.body.planIntervalCount
    }

    STRIPE_API.createCustomerAndSubscription(req.body).then(() => {
        res.render('subscribe.hbs', {product: product, plan: plan, success: true});
    }).catch(err => {
        res.render('subscribe.hbs', {product: product, plan: plan, error: true});
    });
});

mainRouter.get('/robots.txt', (req, res) => {
    res.redirect('/pages/robots.txt');
});

mainRouter.get('/sitemap.xml', (req, res) => {
    res.redirect('/pages/sitemap.xml');
});

module.exports = mainRouter;
