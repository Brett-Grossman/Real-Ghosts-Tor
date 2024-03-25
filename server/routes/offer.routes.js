import {Router} from 'express';
import offerController from "../controllers/offer.controller.js";

const router = Router()

router.route('/offers')
    .get(offerController.getAllOffers)
    .post(offerController.createOffer)

router.route('/offers/:id')
    .get(offerController.getOneOffer)
    .patch(offerController.editOffer)
    .delete(offerController.deleteOffer)

export default router;