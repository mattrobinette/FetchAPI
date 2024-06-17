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
} from '../controllers/dogs.controller.js';

const dogsRouter = express.Router();

// GET /api/vi/dogs
dogsRouter.get('/', getDogs);

// POST /api/v1/dogs
dogsRouter.post('/', createDog);

// GET /api/v1/dogs/<id>
dogsRouter.get('/:id', getDog);

// PUT /api/v1/dogs/<id>
dogsRouter.put('/:id', replaceDog);

// DELETE /api/v1/dogs/<id>
dogsRouter.delete('/:id', deleteDog);

// PATCH /api/v1/dogs/<id>
dogsRouter.patch('/:id', updateDog);

const uploader = multer({
  dest: './static/dogs/image-uploads/',
  limits: {
    fileSize: 5_000_000, // 5MB
  },
});

// POST /api/v1/dogs/<id>/images
widgetsRouter.post('/:is/images', uploader.single('dogImage'), uploadImage);

export default dogsRouter;
