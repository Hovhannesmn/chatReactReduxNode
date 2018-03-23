let express = require('express'); // call express
let app = express();
let mongoose = require('mongoose'); // for working w/ our database
let port = process.env.PORT || 8888; // set the port for our app
let Message = require('../models/message');
let Users = require('../models/users');
let bodyParser = require('body-parser');

connection = mongoose.connect('mongodb://localhost/users');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

    bodyParser.json();

    next();
});

// basic route for the home page
app.get('/', function(req, res) {
    res.send('Welcome to the home page!');
});

app.post('/message', function(req, res) {
    let message = new Message();
    message.userId = req.body.userId;
    message.text = req.body.text;
    message.userName = req.body.userName;
    console.log(req.body);
    message.save(function(err) {
        if (err) {
            // db.getCollection('users').find({})
            if (err.code == 11000)
                return res.json({ success: false, message: 'error'});
            else
                return res.send(err);
        }
        res.json({ message: 'Message created!' });
    });
});

app.get('/message', function(req, res) {
   Message.find(
        function(err, user) {
        if (err) return res.send(err);
        res.json(user);
    }).sort({'_id': -1}).limit(7);
});

app.get('/login/:firstName/:lastName', function(req, res) {
    let users = new Users();

    Users.find({
        firstName : req.params.firstName,
        lastName : req.params.lastName
    }, function(err, user) {
        if (err) return res.send(err);
        res.json(user);
    });

});

app.get('/signup/:firstName/:lastName', function(req, res) {
        let users = new Users();

        users.firstName = req.params.firstName,
        users.lastName  = req.params.lastName,

        users.save(function(err) {
            if (err) {
                if (err.code == 11000)
                    return res.json({ success: false, message: 'error'});
                else
                    return res.send(err);
            }
            res.json({ message: 'Message created!' });
        });


});

app.listen(port);
console.log('Magic happens on port ' + port);
