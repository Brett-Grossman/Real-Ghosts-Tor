import Offer from "../models/offer.model.js"

const offerController = {
    getAllOffers: async (req, res) => {
        try {
            const allOffers = await Offer.find();
            res.json(allOffers)
        } catch (err) {
            console.log("offer.controller.js getAllOffers catch err: ", err)
            res.status(400).json(err)
        }
    },
    getOneOffer: async (req, res) => {
        try {
            const selectedOffer = await Offer.findById(req.params.id)
            res.json(selectedOffer)
        } catch (err) {
            console.log("offer.controller.js getOneOffer catch err: ", err)
            res.status(400).json(err)
        }
    },
    createOffer: async (req, res) => {
        console.log("offer.controller.js createOffer req.body: ", req.body)
        try {
            const newOffer = await Offer.create(req.body)
            res.json(newOffer)
        } catch (err) {
            console.log("offer.controller.js createOffer catch err: ", err)
            res.status(400).json(err)
        }
    },
    editOffer: async (req, res) => {
        const options = {
            new:true,
            runValidators: true
        };
        try {
            const editedOffer = await Offer.findByIdAndUpdate(req.params.id, req.body, options)
            res.json(editedOffer)
        } catch (err) {
            console.log("offer.controller.js editOffer catch err: ", err)
            res.status(400).json(err)
        }
    },
    deleteOffer: async (req, res) => {
        try {
            const deletedOffer = await Offer.findByIdAndDelete(req.params.id)
            res.json(deletedOffer)
        } catch (err) {
            console.log("offer.controller.js deleteOffer catch err: ", err)
            res.status(400).json(err)
        }
    }
}

export default offerController