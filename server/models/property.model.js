import {model, Schema}  from 'mongoose';

const PropertySchema = new Schema({
    lister_user_id: {
        type: String,
        required:  [true, "Property must be listed by a user"]
    },
    lister_username: {
        type: String,
        required: [true, "Username must be provided"]
    },
    lister_user_image: {
        type: String,
        required: [true, "A User Profile picture must be provided."]
    },
    property_name: {
        type: String,
        required: [true, "Property must have a name."]
    },
    property_photo_url: {
        type: String,
        required: [true, "Listing must have a photo."]
    },
    property_photos: {
        type: [String]
    },
    asking_price: {
        type: Number,
        required: [true, "Listing must have an asking price."],
        min: [1, "Listing must be at least 1 dollar."]
    },
    sell_or_rent: {
        type: Boolean,
        default: true
    },
    property_type: {
        type: String,
        required: [true, "Property must have a type."]
    },
    square_footage: {
        type: Number,
        required: [true, "Property must have a square footage."],
        min: [1, "Property must be at least 1 square foot."]
    },
    number_of_beds: {
        type: Number,
        required: [true, "Property must have a number of bedrooms."],
        min: [1, "Property must have at least 1 bedroom."]
    },
    number_of_baths: {
        type: Number,
        required: [true, "Property must have a number of bathrooms."],
        min: [1, "Property must have at least 1 bathroom."]
    },
    number_of_ghosts: {
        type: Number,
        required: [true, "Property must have a number of ghosts"],
        min: [1, "There must be at least one ghost in the property."]
    },
    address: {
        type: String,
        required: [true, "Property must have an address"]
    },
    isSold: {
        type: Boolean,
        default: false
    },
    offer_ids: {
        type: [String]
    },
    winning_bid_amount: {
        type: Number
    },
    winning_bidder_user_id: {
        type: String
    },
    winning_bidder_username: {
        type: String
    },
}, {timestamps: true})

const Property = model("Property", PropertySchema)

export default Property