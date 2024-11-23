const express =require ('express');
const footballerController = require('../controllers/footballerController')


const router = express.Router();

router.get('/' , footballerController.getAllfootballer);
router.get('/:id', footballerController.getFootballerById);
router.post('/create' , footballerController.createFooterballer);
router.delete('/delete/:id', footballerController.deleteFootballer);
router.put('/update/:id', footballerController.updateFootballer);
module.exports = router ;



