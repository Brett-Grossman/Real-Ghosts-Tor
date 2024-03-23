import Property from "../models/property.model.js"

const propertyController = {
    getAllProperties: async (req, res) => {
        try {
            const allProperties = await Property.find();
            res.json(allProperties)
        } catch (err) {
            console.log("property.controller.js getAllProperties catch err: ", err)
            res.status(400).json(err)
        }
    },
    getOneProperty: async (req, res) => {
        try {
            const selectedProperty = await Property.findById(req.params.id);
            res.json(selectedProperty)
        } catch (err) {
            console.log("property.controller.js getOneProperty catch ", err)
            res.status(400).json(err)
        }
    },
    createProperty: async (req, res) => {
        console.log("createProperty req.body: ", req.body);
        try {
            const newProperty = await Property.create(req.body)
            res.json(newProperty)
        } catch (err) {
            console.log("property.controller.js createProperty catch err: ", err)
            res.status(400).json(err)
        }
    },
    editProperty: async (req, res) => {
        const options = {
            new: true,
            runValidators: true
        };
        try {
            const editedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, options)
            res.json(editedProperty)
        } catch (err) {
            console.log("property.controller.js editProperty catch err: ", err)
            res.status(400).json(err)
        }
    },
    deleteProperty: async (req, res) => {
        try {
            const deletedProperty = await Property.findByIdAndDelete(req.params.id)
            res.json(deletedProperty)
        } catch (err) {
            console.log("property.controller.js deleteProperty catch err: ", err)
            res.status(400).json(err)
        }
    }
}

export default propertyController