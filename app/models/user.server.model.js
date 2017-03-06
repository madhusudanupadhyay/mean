var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    comments: String,
    password: String,
    phoneNumber: Number,
    username: {
        type: String,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
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
UserSchema.set('toJSON', { getters: true });
// This User instance will be used to create a Schema for the User
mongoose.model('User', UserSchema);