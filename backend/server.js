const express = require('express');
const promClient = require('prom-client');
const dotenv = require('dotenv');
const serverRoutes = require('./routes/serverRoutes');
dotenv.config();




const connectDB = require('./config/db');

connectDB();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());


const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ app });

app.get('/metrics', (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(promClient.register.metrics());
  });
  
app.use('/api/servers', serverRoutes);


app.listen(port, ()=> console.log(`Server started on port ${port}`));