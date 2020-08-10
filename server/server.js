const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./db/connectDB');
const listRoutes = require('./routes/listRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
connectDB();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin: ['http://localhost:3000']
}));

app.use(listRoutes);
app.use(taskRoutes);

app.listen(process.env.PORT);