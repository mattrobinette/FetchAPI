/* eslint-disable import/extensions */
import multer from 'multer';
import express from 'express';
import {
  getdogs,
  createdog,
  getdog,
  replacedog,
  deletedog,
  updatedog,
} from '../controllers/dogs.controller.js';

const dogsRouter = express.Router();

// GET /api/vi/dogs
dogsRouter.get('/', getdogs);

// POST /api/v1/dogs
dogsRouter.post('/', createdog);

// GET /api/v1/dogs/<id>
dogsRouter.get('/:id', getdog);

// PUT /api/v1/dogs/<id>
dogsRouter.put('/:id', replacedog);

// DELETE /api/v1/dogs/<id>
dogsRouter.delete('/:id', deletedog);

// PATCH /api/v1/dogs/<id>
dogsRouter.patch('/:id', updatedog);

const uploader = multer({
  dest: './static/dogs/image-uploads/',
  limits: {
    fileSize: 5_000_000, // 5MB
  },
});

// POST /api/v1/dogs/<id>/images
widgetsRouter.post('/:is/images', uploader.single('dogImage'), uploadImage);

export default dogsRouter;
