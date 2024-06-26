import { v4 as uuid } from 'uuid';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import logger from '../lib/logger.js';
import DogsModel from '../models/dogs.model.js';
import dogSchema from '../schemas/dog.json' assert { type: 'json' };

const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(dogSchema);

export default class DogsCoordinator {
  static getDogs = () => {
    logger.debug('getDogs', {
      location: 'coordinator',
      function: 'getDogs',
    });
    return DogsModel.getDogs();
  };

  static createDog = (newDog) => {
    logger.debug({
      location: 'coordinator',
      function: 'createDog',
    });

    const dog = {
      ...newDog,
      id: uuid(),
    };

    const valid = validate(dog);
    if (!valid) {
      throw validate.errors
    }

    return DogsModel.createDog(dog);
  };

  static getDog = (id) => {
    logger.debug({
      location: 'coordinator',
      function: 'getDog',
      id,
    });
    return DogsModel.getDog(id);
  };

  static deleteDog = (id) => {
    logger.debug({
      location: 'coordinator',
      function: 'deleteDog',
      id,
    });
    return DogsModel.deleteDog(id);
  };

  static replaceDog = (id, dog) => {
    logger.debug({
      location: 'coordinator',
      function: 'replaceDog',
      id,
    });

    const valid = validate(dog);
    if (!valid) {
      throw validate.errors
    }

    const replaceDog = {
      ...dog,
      id,
    };

    return DogsModel.replaceDog(id, replaceDog);
  };

  static updateDog = (id, dog) => {
    logger.debug({
      location: 'coordinator',
      function: 'updateDog',
      id,
    });

    const valid = validate(dog);
    if (!valid) {
      throw validate.errors
    }

    return DogsModel.updateDog(id, dog);
  };

  static addImageToDog = (id, imagePath) => {
    logger.debug({
      location: 'coordinator',
      function: 'addImageToDog',
      imagePath,
      id,
    });

    return DogsModel.addImageToDog(id, imagePath);
  };
}
