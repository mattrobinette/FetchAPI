// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member

import dogsCoordinator from '../coordinators/dogs.coordinator.js';

export const getDogs = async (req, res, next) => {
  console.log('Controller : getDogs()');

  try {
    const result = await dogsCoordinator.getDogs(req.body);
    res.status(200).json(result);
    console.log(result);
  } catch (ex) {
    next(ex);
  }
};

export const createDog = async (req, res, next) => {
  console.log('Controller : createDog()');

  try {
    const result = await dogsCoordinator.createdog(req.body);
    res.status(201).json(result);
    console.log(result);
  } catch (ex) {
    next(ex);
  }
};

export const getdog = async (req, res, next) => {
  console.log(`Controller : getDog(${req.params.id})`);

  try {
    const result = await dogsCoordinator.getDog(req.params.id);
    if (result) {
      res.status(200).json(result);
      console.log(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
};

export const deleteDog = async (req, res, next) => {
  console.log(`Controller : deleteDog(${req.params.id})`);

  try {
    const result = await dogsCoordinator.deleteDog(req.params.id, req.body);

    if (result) {
      res.status(200).json(result);
      console.log('dog successfully deleted!');
    } else {
      res.status(404).json();
      console.log('dog not found. :(');
    }
  } catch (ex) {
    next(ex);
  }
};

export const replaceDog = async (req, res, next) => {
  console.log(`Controller : replaceDog(${req.params.id})`);

  try {
    const result = await dogsCoordinator.replaceDog(req.params.id, req.body);

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
  console.log(`Controller : updateDog(${req.params.id})`);

  try {
    const result = await dogsCoordinator.updateDog(req.params.id, req.body);

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

export const uploadImage = async (req, res, next) => {
  console.log('Controller : uploadImage(${req.params.id})');

  if (req.file) {
    console.log('Looks like we got a file');
  }

  res.sendStatus(200);

  try {
    const result = null;//await dogsCoordinator.updateDog(req.params.id, req.body);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json();
    }
  } catch (ex) {
    next(ex);
  }
};
