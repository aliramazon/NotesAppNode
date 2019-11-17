const mongoose = require('mongoose');
const dotenv = require('dotenv');
const validator = require('validator');

dotenv.config({ path: './config.env' });
const DB_URL = process.env.DB_URL.replace(
    '<PASSWORD>',
    process.env.DB_PASSWORD,
);

mongoose
    .connect(DB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log('DB connection is successful'));

const User = mongoose.model('User', {
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

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: [true, 'This field cannot be empty'],
        minlength: [10, 'Todo must contain at least 10 characters'],
        maxlength: [50, 'Todo must contain less than 50 characters'],
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});
