import express from 'express';
import auth from '../middleware/auth.js';
import { createItem, deleteItem, getAllItems, getItem, getMyItems, updateItem } from '../controllers/itemController.js';
import upload from '../config/multerConfig.js';

const router = express.Router();

router.route('/')
        .post(auth, upload.array('images', 5), createItem)
        .get(getAllItems)

router.get('/my-items', auth, getMyItems);

router.route('/:id')
        .get(getItem)
        .put(auth, updateItem)
        .delete(auth, deleteItem)

export default router;