// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member

import dogsCoordinator from '../coordinators/dogs.coordinator.js';

export const getdogs = async (req, res, next) => {
  console.log('Controller : getdogs()');

  try {
    const result = await dogsCoordinator.getdogs(req.body);
    res.status(200).json(result);
    console.log(result);
  } catch (ex) {
    next(ex);
  }
};

export const createdog = async (req, res, next) => {
  console.log('Controller : createdog()');

  try {
    const result = await dogsCoordinator.createdog(req.body);
    res.status(201).json(result);
    console.log(result);
  } catch (ex) {
    next(ex);
  }
};

export const getdog = async (req, res, next) => {
  console.log(`Controller : getdog(${req.params.id})`);

  try {
    const result = await dogsCoordinator.getdog(req.params.id);
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

export const deletedog = async (req, res, next) => {
  console.log(`Controller : deletedog(${req.params.id})`);

  try {
    const result = await dogsCoordinator.deletedog(req.params.id, req.body);

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

export const replacedog = async (req, res, next) => {
  console.log(`Controller : replacedog(${req.params.id})`);

  try {
    const result = await dogsCoordinator.replacedog(req.params.id, req.body);

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

export const updatedog = async (req, res, next) => {
  console.log(`Controller : updatedog(${req.params.id})`);

  try {
    const result = await dogsCoordinator.updatedog(req.params.id, req.body);

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
    const result = null;//await dogsCoordinator.updatedog(req.params.id, req.body);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json();
    }
  } catch (ex) {
    next(ex);
  }
};
