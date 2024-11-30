const express =require ('express');
const footballerController = require('../controllers/footballerController')
const { authenticateToken } = require("../middleware/authMiddleware")


const router = express.Router();

router.get('/' ,authenticateToken(['users','admin']), footballerController.getAllfootballer);
router.get('/:id',authenticateToken(['users','admin']), footballerController.getFootballerById);
router.post('/create' ,authenticateToken(['admin']), footballerController.createFootballer);
router.delete('/delete/:id',authenticateToken(['admin']), footballerController.deleteFootballer);
router.put('/update/:id',authenticateToken(['admin']), footballerController.updateFootballer);
module.exports = router ;



