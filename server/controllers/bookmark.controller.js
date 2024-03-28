import Bookmark from "../models/bookmark.model.js"

const bookmarkController = {
    getAllBookmarks: async (req, res) => {
        try {
            const allBookmarks = await Bookmark.find();
            res.json(allBookmarks)
        } catch (err) {
            console.log("bookmark.controller.js getAllBookmarks catch err: ", err)
            res.status(400).json(err)
        }
    },
    // create
    createBookmark: async (req, res) => {
        try {
            const newBookmark = await Bookmark.create(req.body)
            res.json(newBookmark)
            console.log("bookmark.controller.js createBookmark try newBookmark: ", newBookmark)
        } catch (err) {
            console.log("bookmark.controller.js createBookmark catch err: ", err)
            res.status(400).json(err)
        }
    },
    // delete
    deleteBookmark: async (req, res) => {
        try {
            const deletedBookmark = await Bookmark.findByIdAndDelete(req.params.id)
            res.json(deletedBookmark)
            console.log("bookmark.controller.js deleteBookmark try deletedBookmark: ", deletedBookmark)
        } catch (err) {
            console.log("bookmark.controller.js deleteBookmark catch err: ", err)
        }
    }
}

export default bookmarkController