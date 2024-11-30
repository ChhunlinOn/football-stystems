const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const matchRoutes = require('./routes/matchRoutes');
const footballerRoutes = require('./routes/footballerRoutes');
const ticketRoutes = require('./routes/ticketsRoutes');
const buyingRoutes = require('./routes/buyingRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/footballers', footballerRoutes);
app.use('/api/tickets', ticketRoutes);  // Corrected line
app.use('/api/booking', buyingRoutes);  // Also fixed the space in the route

module.exports = app;
