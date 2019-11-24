const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

// Sign Token
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// Create and Send Token
const createAndSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    newUser.password = undefined;

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser,
        },
    });
});
