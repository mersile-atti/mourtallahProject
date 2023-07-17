import express from 'express';
import dotenv from 'dotenv';
import serverRoutes from './routes/serverRoutes.js';
dotenv.config();

import connectDB from './config/db.js';

connectDB();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());


app.use('/api/servers', serverRoutes);


app.listen(port, ()=> console.log(`Server started on port ${port}`));