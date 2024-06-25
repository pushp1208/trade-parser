const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const uploadRoutes = require('./routes/upload');
const balanceRoutes = require('./routes/balance');

const app = express();

// Connect to database
connectDB();

app.use(bodyParser.json());

// Routes
app.use('/upload-csv', uploadRoutes);
app.use('/balance', balanceRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Trade Parser API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
