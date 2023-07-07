import express from 'express';
import {
  saveTranslation,
  viewTranslations,
} from '../controllers/youtubeController';

const router = express.Router();

router.route('/:id/translations').post(saveTranslation).get(viewTranslations);

module.exports = router;
