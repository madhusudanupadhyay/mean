//calling the model method from users.server.model.js
var User = require('mongoose').model('User');
//List users
exports.list = function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};
//create Users
exports.create = function(req, res, next) {
    var user = new User(req.body);

    user.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};
//Reads Users
exports.read = function(req, res) {
    res.json(req.user);
};

//Update User
exports.update = function(req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

//Delete User
exports.delete = function(req, res, err) {
    req.user.remove = function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(req.user);
        }
    };
};

//Find Single User
exports.userByID = function(req, res, next, id) {
    User.findOne({
        _id: id
    }, function(err, user) {
        if (err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    });
};