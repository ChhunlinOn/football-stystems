const Buying = require('../models/buyingModel');
const Ticket = require('../models/ticketModel');


// Buy a Ticket
exports.buyTicket = async (req, res) => {
  try {
    const { user_id, ticket_id } = req.body;

    // Check if the ticket is available
    const ticket = await Ticket.findById(ticket_id);
    if (!ticket || !ticket.availability) {
      return res.status(400).json({ message: 'Ticket is not available' });
    }

    // Create a new purchase
    const newPurchase = new Buying({
      user_id,
      ticket_id,
    });

    await newPurchase.save();

    // Update ticket availability
    ticket.availability = false;
    await ticket.save();

    res.status(201).json({ message: 'Ticket purchased successfully', purchase: newPurchase });
  } catch (error) {
    res.status(500).json({ message: 'Failed to purchase ticket', error: error.message });
  }
};

// Get all purchases
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await Buying.find()
      .populate('user_id', 'name email') // Populate user details
      .populate('ticket_id'); // Populate ticket details

    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve purchases', error: error.message });
  }
};

// Get purchase by ID
exports.getPurchaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await Buying.findById(id)
      .populate('user_id', 'name email')
      .populate('ticket_id');

    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve purchase', error: error.message });
  }
};

// Cancel a Purchase
exports.cancelPurchase = async (req, res) => {
  try {
    const { id } = req.params;

    const purchase = await Buying.findByIdAndUpdate(
      id,
      { status: 'canceled' },
      { new: true }
    );

    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    // Update ticket availability
    const ticket = await Ticket.findById(purchase.ticket_id);
    if (ticket) {
      ticket.availability = true;
      await ticket.save();
    }

    res.status(200).json({ message: 'Purchase canceled successfully', purchase });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel purchase', error: error.message });
  }
};
