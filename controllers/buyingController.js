const Buying = require('../models/buyingModel');
const tickets = require('../models/ticketModel')
const matchs = require('../models/matchModel')


exports.buyTicket = async (req, res) => {
  try {
    const { user_id, ticket_id } = req.body;
    const createby = req.user.id;
    console.log(createby);

    // Check if the ticket exists
    const ticket = await tickets.findById(ticket_id);
    if (!ticket) {
      return res.status(400).json({ message: "Ticket not found" });
    }

    // Check if the ticket is available
    if (!ticket.availability) {
      return res.status(404).json({ message: "Ticket unavailable" });
    }

    // Create a new purchase record
    const newPurchase = new Buying({
      user_id,
      ticket_id,
      new: true
    });

    // Save the purchase record
    await newPurchase.save();

    // // Populate user, ticket, and match details
    // const populatedPurchase = await Buying.findById(newPurchase._id)
    //   .populate('user_id', 'name email avatar') // Populate User details
    //   .populate({
    //     path: 'ticket_id',
    //     select: 'price availability match_id',
    //   });

      const ticketid = newPurchase.ticket_id;
      console.log(ticketid);
      
      const findticket = await tickets.findById(
        ticketid ,
      );
      
      if (!findticket) {
    return res.status(404).json({ message: "ticket not found" });
  }

      const matchid = findticket.match_id;
      console.log(matchid);

      const match = await matchs.findById(matchid); // Fetch the match document

      if (!match) {
        return res.status(404).json({ message: "Match not found" });
      }
      
      if (match.seats <= 0) {
        return res.status(400).json({ message: "No seats available" });
      }

      const updatematch = await matchs.findByIdAndUpdate(
        matchid,
        { seats: match.seats - 1 },
        {new: true}
      );

      // if (!updatematch) {
      //   return res.status(404).json({ message: "match not found" });
      // }

  res.status(201).json({
    message: "Ticket purchased successfully",
    purchase: newPurchase,
    ticket: findticket,
    match: updatematch
  });


  } catch (error) {
    res.status(500).json({ message: "Failed to purchase ticket", error: error.message });
  }
};


// Get all purchases
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await Buying.find()
      .populate('user_id', 'name email') // Populate user details
      .populate({
        path: 'ticket_id',
        select: 'price availability match_id', // Select fields from the Ticket model
      });

    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve purchases', error: error.message });
  }
};


// Get purchase by ID
exports.getPurchaseById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const purchase = await Buying.findById(id)
      .populate('user_id', 'name email')
      .populate({
        path: 'ticket_id',
        select: 'price availability match_id', // Select fields from the Ticket model
      });

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

    const purchasecheck = await Buying.findById(id);

    if (purchasecheck.status === 'canceled') {
      return res.status(404).json({ message: 'Purchase is already canceled' });
    }

    const purchase = await Buying.findByIdAndUpdate(
      id,
      { status: 'canceled' },
      { new: true }
    );


    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    const ticketid = purchase.ticket_id;
    console.log(ticketid);
    
    const findticket = await tickets.findById(
      ticketid ,
    );
    
    if (!findticket) {
  return res.status(404).json({ message: "ticket not found" });
}

    const matchid = findticket.match_id;
    console.log(matchid);

    const match = await matchs.findById(matchid); // Fetch the match document

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    
    if (match.seats <= 0) {
      return res.status(400).json({ message: "No seats available" });
    }

    const updatematch = await matchs.findByIdAndUpdate(
      matchid,
      { seats: match.seats + 1 },
      {new: true}
    );

    // // Update ticket availability
    // const ticket = await tickets.findById(purchase.ticket_id);
    // if (ticket) {
    //   ticket.availability = true;
    //   await ticket.save();
    // }

    res.status(200).json({ message: 'Purchase canceled successfully', purchase , updatematch});
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel purchase', error: error.message });
  }
};
