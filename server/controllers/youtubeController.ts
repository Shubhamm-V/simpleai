import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';
import createAsync from '../utils/createAsync';
import AppError from '../utils/AppError';

export const saveTranslation = createAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, subtitles, url, translation, language } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          youtubeTranslations: {
            url,
            title,
            subtitles,
            translation,
            language,
            // Other properties of the translation object
          },
        },
      },
      { new: true } // Return the updated document
    ).select('youtubeTranslations');

    if (!updatedUser) {
      return next(
        new AppError(`User with ${req.params.id} doesn't exists`, 404)
      );
    }
    res.status(200).json({
      status: 'success',
      data: {
        translation: updatedUser,
      },
    });
  }
);

export const viewTranslations = createAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const translations = User.findById(req.params.id).select(
      'youtubeTranslations'
    );
    if (!translations) {
      return next(
        new AppError(`User with id ${req.params.id} doesn't exists`, 404)
      );
    }
    res.status(200).json({
      status: 'success',
      translations,
    });
  }
);
