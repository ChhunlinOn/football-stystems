const express = require("express");
const match = require("../controllers/matchController");
const { authenticateToken } = require("../middleware/authMiddleware")

const router = express.Router();
router.get('/get',authenticateToken(['users','admin']), match.getAllMatches);
router.get('/:id',authenticateToken(['users','admin']), match.getMatch); 

router.post('/create',authenticateToken(['admin']), match.createMatch);
router.put('/update/:id',authenticateToken(['admin']), match.updateMatch); 
router.delete("/delete/:id",authenticateToken(['admin']), match.deleteMatch);

module.exports = router;
