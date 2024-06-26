/* eslint-disable import/extensions */
import multer from 'multer';
import express from 'express';
import {
  getDogs,
  createDog,
  getDog,
  replaceDog,
  deleteDog,
  updateDog,
  uploadImage,
} from '../controllers/dogs.controller.js';
import authMiddleware from '../middleware/auth.js';

const dogsRouter = express.Router();

// GET /api/vi/dogs
dogsRouter.get('/', getDogs);

// POST /api/v1/dogs
dogsRouter.post('/', [authMiddleware()], createDog);

// GET /api/v1/dogs/<id>
dogsRouter.get('/:id', getDog);

// PUT /api/v1/dogs/<id>
dogsRouter.put('/:id', [authMiddleware()], replaceDog);

// DELETE /api/v1/dogs/<id>
dogsRouter.delete('/:id', [authMiddleware()], deleteDog);

// PATCH /api/v1/dogs/<id>
dogsRouter.patch('/:id', [authMiddleware()], updateDog);

const uploader = multer({
  dest: './static/dogs/image-uploads/',
  limits: {
    fileSize: 5_000_000, // 5MB
  },
});

// POST /api/v1/dogs/<id>/images
dogsRouter.post('/:id/images', uploader.single('dogImage'), uploadImage);

export default dogsRouter;
