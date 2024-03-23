import {Router} from 'express';
import propertyController from '../controllers/property.controller.js';

const router = Router()

router.route('/properties')
    .get(propertyController.getAllProperties)
    .post(propertyController.createProperty)

router.route('/properties/:id')
    .get(propertyController.getOneProperty)
    .patch(propertyController.editProperty)
    .delete(propertyController.deleteProperty)

export default router;