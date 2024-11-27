const express = require('express');
const userController = require('../controllers/userController');
const { authenticateToken} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, userController.getAllUsers);
router.get('/:id', authenticateToken, userController.geteachUsers);
router.put('/update/:id',authenticateToken,userController.updateUser);
router.delete('/delete/:id',authenticateToken,userController.Deleteuser);

module.exports = router;
