const mongoose = require('mongoose');

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
