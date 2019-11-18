const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'This field cannot be empty'],
        minlength: [true, 'Name must contain at least 3 characters'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email field cannot be empty'],
        validate: [validator.isEmail, 'Please provide a valid email'],
        unique: true,
        lovercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'Password must contain at least 8 characters'],
        trim: true,
        validate: {
            validator: function() {
                return !this.password.toLowerCase().includes('password');
            },
            message: 'Password must not contain a word password',
        },
    },

    passwordConfirm: {
        type: String,
        required: [true, 'Please provide a password confirmation'],
        validate: {
            validator: function(passwordConfirm) {
                return passwordConfirm === this.password;
            },
            message: 'Password confirmation does not match the password',
        },
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
