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
    },
    email: {
        type: String,
        required: [true, 'Email field cannot be empty'],
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
});

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: [true, 'This field cannot be empty'],
        minlength: [10, 'Todo must contain at least 10 characters'],
        maxlength: [50, 'Todo must contain less than 50 characters'],
    },
    completed: {
        type: Boolean,
        default: false,
    },
});
