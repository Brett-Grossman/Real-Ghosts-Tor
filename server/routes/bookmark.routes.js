import {Router} from 'express';
import bookmarkController from '../controllers/bookmark.controller.js';

const router = Router()

router.route('/bookmarks')
    .get(bookmarkController.getAllBookmarks)
    .post(bookmarkController.createBookmark)

router.route('/bookmarks/:id')
    .delete(bookmarkController.deleteBookmark)

export default router;