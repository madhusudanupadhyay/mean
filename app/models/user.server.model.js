var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: true,
        match: [/.+\@.+ \.. + /, 'Enter a valid email, por favor']
    },
    comments: String,
    username: {
        type: String,
        trim: true,
        unique: true,
        required: 'Username is required, Obviously!'
    },
    role: {
        type: String,
        enum: ['Admin', 'Owner', 'User']
    },
    created: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        validate: [
            function(password) {
                return password.length >= 6;
            },
            'Password should be Longer'
        ]
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerID: String,
    providerData: {},
    phoneNumber: Number,
    website: {
        type: String,
        get: function(url) {
            if (!url) {
                return url;
            } else {
                if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                    url = 'http://' + url;

                }
                return url;
            }
        }
    }

});

// Second Schema

// var PostSchema = new Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     content: {
//         type: String,
//         required: true
//     },
//     author: {
//         type: Schema.objectId,
//         ref: 'User'
//     }
// });


UserSchema.set('toJSON', { getters: true });
UserSchema.methods.authenticate = function(password) {
    return this.password === password;
};


// This User instance will be used to create a Schema for the User
mongoose.model('User', UserSchema);

// This is for calling the second schema.
// mongoose.model('Post', PostSchema);