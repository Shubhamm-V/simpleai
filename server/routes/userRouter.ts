import express from 'express';
import { addUser } from '../controllers/userController';
const router = express.Router();

router.route('/').post(addUser);

module.exports = router;
