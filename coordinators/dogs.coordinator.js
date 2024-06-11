/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { v4 as uuid } from 'uuid';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import dogsModel from '../models/dogs.model.js';
import dogSchema from '../schemas/dog.json' assert { type: 'json' };

const ajv = new Ajv();
addFormats(ajv);
const validate = ajv.compile(dogSchema);

export default class dogsCoordinator {
  static getdogs = () => {
    console.log('\t Coordinator : getdogs()');

    return dogsModel.getdogs();
  };

  static createdog = (newdog) => {
    console.log('\t Coordinator : createdog()');

    const dog = {
      ...newdog,
      id: uuid(),
    };

    const valid = validate(dog);
    if (!valid) {
      throw validate.errors
    };

    return dogsModel.createdog(dog);
  };

  static getdog = (id) => {
    console.log('\t Coordinator : getdog()');
    return dogsModel.getdog(id);
  };

  static deletedog = (id) => {
    console.log('\t Coordinator : deletedog()');
    return dogsModel.deletedog(id);
  };

  static replacedog = (id, dog) => {
    const replacedog = {
      ...dog,
      id,
    };

    return dogsModel.replacedog(id, replacedog);
  };

  static updatedog = (id, dog) => {
    console.log('\t Coordinator : updatedog()');

    const valid = validate(dog);
    if (!valid) {
      throw validate.errors
    };
    
    return dogsModel.updatedog(id, dog);
  };
}
