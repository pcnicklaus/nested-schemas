var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));
var Dog = require('../models/dog.js');
var User = require('../models/user.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

//save a new user
router.post('/users', function(req, res, next) {
    var newUser = new User(req.body);
    newUser.saveQ()
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        res.send(err);
    })
    .done();
});

router.get('/users', function (req, res, next) {
    User.findQ()
    .then(function(response) {
        res.json(response);
    })
    .catch (function(err) {
        res.send({"ERROR": err});
    });
});

router.get('/dogs', function (req, res, next) {
    Dog.findQ()
    .then (function (response) {
        res.json(response);
    })
    .catch (function(err) {
        res.json(response);
    });
});

//save a new event
router.post('/dogs', function(req, res, next) {
    var newDog = new Dog(req.body);
    newDog.saveQ()
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        res.send(err);
    });
});

//save an event to a user
router.post('/user/:userid/dogs', function(req, res, next) {
    var newDog = new Dog(req.body);
    newDog.saveQ();

    // var event = req.body.event;
    var id = req.params.userid;
    var update = { $push : {dogs : newDog}};
    var options = {new:true};


    User.findByIdAndUpdateQ(id, update, options)
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        res.send(err);
    });
});


//list a users events
router.get('/user/:userid/dogs', function(req, res, next) {
    User.findById(req.params.userid)
    .populate('dogs')
    .exec(function(err, user) {
        if(err) {
            console.log(err)
            res.send(err);
        } else {
            console.log(user)
            res.json(user.dogs);
        }
    });
});

router.delete('/user/:userid/dogs', function (req, res, next) {
    Dog.findByIdRemoveQ(req.params.userid)
    .then()
});
