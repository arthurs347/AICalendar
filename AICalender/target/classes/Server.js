const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose.connect('mongodb+srv://arthurs347251:igr8YqGkBrDnnN@cluster0.wfgcabz.mongodb.net/Ai_Calender?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a schema and model
const taskSchema = new mongoose.Schema({
    taskName: String,
    dueDate: Date,
    description: String,
    timeRequired: String,
    priority: String
});

const Task = mongoose.model('Task', taskSchema);

// API endpoint to receive data
app.post('/submit', async (req, res) => {
    const newTask = new Task(req.body);
    try {
        await newTask.save();
        res.status(200).send({ message: 'Data saved successfully!' });
    } catch (err) {
        res.status(500).send(err);
    }
});

// API endpoint to fetch all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Define a route to handle GET requests to the root URL
app.get('/', (req, res) => {
    res.send('Welcome to AI Calendar!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
