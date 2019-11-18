const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
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

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
