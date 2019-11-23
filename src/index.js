const express = require('express');
const dotenv = require('dotenv');

const taskRouter = require('./routes/taskRoutes');

const globalErrorHandler = require('./utils/globalErrorHandler');

dotenv.config({ path: './config.env' });

require('./db/mongoose');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// API Routes
app.use('/api/v1/tasks', taskRouter);
app.use(globalErrorHandler);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
