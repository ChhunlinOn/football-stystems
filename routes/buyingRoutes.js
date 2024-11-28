const express = require('express');
const {
  buyTicket,
  getAllPurchases,
  getPurchaseById,
  cancelPurchase,
} = require('../controllers/buyingController');

const buyingRouter = express.Router();

// Route to buy a ticket
buyingRouter.post('/buy', buyTicket); // POST /buy

// Route to get all purchases
buyingRouter.get('/purchases', getAllPurchases); // GET /purchases

// Route to get a purchase by ID
buyingRouter.get('/purchases/:id', getPurchaseById); // GET /purchases/:id

// Route to cancel a purchase
buyingRouter.put('/purchases/:id', cancelPurchase); // PUT /purchases/:id

module.exports = buyingRouter;
