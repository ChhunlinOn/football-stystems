const express = require('express');
const userController = require('../controllers/userController');
const { authenticateToken} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken(['admin']), userController.getAllUsers);
router.get('/:id', authenticateToken(['users','admin']), userController.geteachUsers);
router.put('/update/:id',authenticateToken(['admin']),userController.updateUser);
router.delete('/delete/:id',authenticateToken(['admin']),userController.Deleteuser);

module.exports = router;
