const express = require("express");
const match = require("../controllers/matchController");

const router = express.Router();
router.get('/get', match.getAllMatches);
router.get('/:id', match.getMatch); 

router.post('/create', match.createMatch);
router.put('/update/:id', match.updateMatch); 
router.delete("/delete/:id", match.deleteMatch);

module.exports = router;
