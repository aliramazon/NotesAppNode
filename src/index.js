const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

require('./db/mongoose');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
