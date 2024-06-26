/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import { rename } from 'fs/promises';
import DogsCoordinator from '../coordinators/dogs.coordinator.js';
import logger from '../lib/logger.js';

export const getDogs = async (req, res, next) => {
  logger.info('Calling controller.getDogs', {
    location: 'controller',
    function: 'getWidgets',
    method: 'GET',
  });

  try {
    const result = await DogsCoordinator.getDogs(req.body);
    res.status(200).json(result);
  } catch (ex) {
    next(ex);
  }
};

export const createDog = async (req, res, next) => {
  logger.info({
    location: 'controller',
    function: 'createDog',
    method: 'POST',
  });

  try {
    await DogsCoordinator.createDog(req.body);
    res.status(201).send('Added dog successfully');
  } catch (ex) {
    next(ex);
  }
};

export const getDog = async (req, res, next) => {
  logger.info({
    location: 'controller',
    function: 'getDog',
    method: 'GET',
    id: req.params.id,
  });

  try {
    const result = await DogsCoordinator.getDog(req.params.id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).send('Dog not found');
    }
  } catch (ex) {
    next(ex);
  }
};

export const deleteDog = async (req, res, next) => {
  logger.info({
    location: 'controller',
    function: 'deleteDog',
    method: 'DELETE',
    id: req.params.id,
  });

  try {
    const result = await DogsCoordinator.deleteDog(req.params.id, req.body);

    if (result) {
      res.status(200).send('Removed dog successfully');
    } else {
      res.status(404).send('Dog not found');
    }
  } catch (ex) {
    next(ex);
  }
};

export const replaceDog = async (req, res, next) => {
  console.log(`Controller : replaceDog(${req.params.id})`);

  try {
    const result = await DogsCoordinator.replaceDog(req.params.id, req.body);

    if (result) {
      res.status(201).json(result);
      console.log(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
};

export const updateDog = async (req, res, next) => {
  logger.info({
    location: 'controller',
    function: 'updateDog',
    method: 'PATCH',
    id: req.params.id,
  });

  try {
    const result = await DogsCoordinator.updateDog(req.params.id, req.body);

    if (result) {
      res.status(200).send('Updated dog successfully');
    } else {
      res.status(404).send('Dog not found');
    }
  } catch (ex) {
    next(ex);
  }
};

export const uploadImage = async (req, res, next) => {
  logger.info({
    location: 'controller',
    function: 'uploadImage',
    method: 'POST',
    id: req.params.id,
  });

  if (!req.file) {
    res.status(400).send('File doesn\'t exist');
  }

  if (req.file.mimetype.indexOf('image') < 0) {
    res.status(400).send('Filetype must be an image');
  }

  try {
    const newFilename = `${req.file.originalname}`;
    const newFilenamePath = `${req.file.destination}${req.file.originalname}`;
    await rename(req.file.path, newFilenamePath);

    const result = await DogsCoordinator.addImageToDog(req.params.id, newFilename);

    if (result && result.modifiedCount > 0) {
      res.status(200).json('Image uploaded and database updated successfully');
    } else {
      res.status(400).send('Dog not found or database update failed');
    }
  } catch (ex) {
    next(ex);
  }
};
