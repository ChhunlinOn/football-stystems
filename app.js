const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const matchRoutes = require('./routes/matchRoutes');

const footballerRoutes = require ('./routes/footballerRoutes')


const app = express();


app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use('/api/matches', matchRoutes);


app.use('/api/footballers',footballerRoutes)


module.exports = app;


