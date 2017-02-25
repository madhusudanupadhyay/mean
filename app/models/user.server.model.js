var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
    phoneNumber: Number
});
// This User instance will be used to create a Schema for the User
mongoose.model('User', UserSchema);