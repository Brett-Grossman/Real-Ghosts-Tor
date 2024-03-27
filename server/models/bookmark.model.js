import {model, Schema} from 'mongoose';

const BookmarkSchema = new Schema({
    creator_user_id: {
        type: String,
        required: [true, "Bookmark must a creator"]
    },
    lister_username: {
        type: String,
        required: [true, "Property in bookmark must have a lister"]
    },
    lister_user_image: {
        type: String,
        required: [true,  "Property in bookmark must have a lister's picture"]
    },
    property_name: {
        type: String,
        required: [true, "Property in bookmark must have a name"]
    },
    property_photo_url: {
        type: String,
        required: [true, "Property in bookmark must have a photo"]
    },
    asking_price: {
        type: Number,
        required: [true, "Property in bookmark must have an asking price"]
    },
    sell_or_rent: {
        type: Boolean,
        required: [true, "Property in bookmark must have a boolean value for sell_or_rent"]
    },
    property_type: {
        type: String,
        required: [true, "Property in bookmark must have a type"]
    },
    square_footage: {
        type: Number,
        required: [true, "Property in bookmark must have a square footage"]
    },
    number_of_beds: {
        type: Number,
        required: [true, "Property in bookmark must have a number of beds"]
    },
    number_of_baths: {
        type: Number,
        required: [true, "Property in bookmark must have a number of baths"]
    },
    number_of_ghosts: {
        type: Number,
        required: [true, "Property in bookmark must have a number of ghosts"]
    },
    address: {
        type: String,
        required: [true, "Property in bookmark must have an address"]
    },
    isSold: {
        type: Boolean,
        required: [true, "Property in bookmark must have a boolean for isSold"]
    }
}, {timestamps: true})

const Bookmark = model("Bookmark", BookmarkSchema)

export default Bookmark