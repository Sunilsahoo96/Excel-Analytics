const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoutes = require( './routes/auth.js');
const excelRoutes = require( './routes/excelRoutes.js');
const adminRoutes = require('./routes/admin');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected With MongoDB'));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
app.use('/api/auth', authRoutes);
app.use('/api/excel', excelRoutes);
app.use('/api/admin', adminRoutes);


app.listen(5000, () => console.log('Server running on port 5000'));
