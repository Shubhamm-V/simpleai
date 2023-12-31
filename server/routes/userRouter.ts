import express from 'express';
import { addUser, getUser } from '../controllers/userController';
import {
  forgotPassword,
  login,
  resetPassword,
  signup,
} from '../controllers/authController';
const router = express.Router();

router.route('/').post(addUser);
router.route('/:email').get(getUser);

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);

module.exports = router;
