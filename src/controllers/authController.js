const User = require('../models/userModel');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.isAuthenticated = catchAsync(async (req, res, next) => {
    // 1) Getting toke and  check if it exists
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(
            new AppError(
                'You are not logged in! Please, log in to get access',
                401,
            ),
        );
    }

    // 2) Validate token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const parsedUser = await User.findById(decoded.id);
    if (!parsedUser) {
        return next(new AppError('User does not exist', 401));
    }

    // 3) GRANT ACCESS TO PROTECTED ROUTE
    req.user = parsedUser;
    next();
});

exports.logout = (req, res) => {
    res.status(200).json({
        status: 'success',
        token: 'loggedout',
    });
};
