const express = require('express');
const dotenv = require('dotenv');

const AppError = require('./utils/appError.js');
const taskRouter = require('./routes/taskRoutes');
const userRouter = require('./routes/userRoutes');

const globalErrorHandler = require('./utils/globalErrorHandler');

dotenv.config({ path: './config.env' });

require('./db/mongoose');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// API Routes
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Cant't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
