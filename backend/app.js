const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/filters', require('./routes/filterRoutes'));
app.use('/api/organize', require('./routes/organizeRoutes'));
app.use('/api/files', fileRoutes);



module.exports = app;