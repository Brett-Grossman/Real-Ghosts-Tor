import {model, Schema } from 'mongoose';

const OfferSchema = new Schema({
        // property_id String required
        property_id: {
            type: String,
            required: [true, "Offer must have a property id"]
        },
        // property_name String required
        property_name: {
            type: String,
            required: [true, "Offer must have a property name"]
        },
        // seller_id String required
        lister_id: {
            type: String,
            required: [true, "Offer must have a lister id"]
        },
        // seller_username String required
        lister_username: {
            type: String,
            required: [true, "Offer must have a lister username"]
        },
        // offer_amount Number required
        offer_amount: {
            type: Number,
            required: [true, "Offer must have a bid amount"],
            min: [1,"Offer must be at least 1 dollar"]
        },
        // bidder_id String required
        bidder_user_id: {
            type: String,
            required: [true, "Offer must have a bidder id"]
        },
        // bidder_username required
        bidder_username: {
            type: String,
            required: [true, "Offer must have a bidder username"]
        }
        // date_added and date_updated
}, {timestamps: true})

const Offer = model("Offer", OfferSchema);

export default Offer