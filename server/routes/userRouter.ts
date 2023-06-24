import express from 'express';
import { addUser } from '../controllers/userController';
import { login, signup } from '../controllers/authController';
const router = express.Router();

router.route('/').post(addUser);

router.route('/signup').post(signup);
router.route('/login').post(login);

module.exports = router;
