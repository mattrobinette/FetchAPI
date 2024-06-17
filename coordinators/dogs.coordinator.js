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
  static getDogs = () => {
    console.log('\t Coordinator : getDogs()');

    return dogsModel.getDogs();
  };

  static createDog = (newDog) => {
    console.log('\t Coordinator : createDog()');

    const dog = {
      ...newDog,
      id: uuid(),
    };

    const valid = validate(dog);
    if (!valid) {
      throw validate.errors
    };

    return dogsModel.createDog(dog);
  };

  static getDog = (id) => {
    console.log('\t Coordinator : getDog()');
    return dogsModel.getDog(id);
  };

  static deleteDog = (id) => {
    console.log('\t Coordinator : deleteDog()');
    return dogsModel.deleteDog(id);
  };

  static replaceDog = (id, dog) => {
    const replaceDog = {
      ...dog,
      id,
    };

    return dogsModel.replaceDog(id, replaceDog);
  };

  static updateDog = (id, dog) => {
    console.log('\t Coordinator : updateDog()');

    const valid = validate(dog);
    if (!valid) {
      throw validate.errors
    };
    
    return dogsModel.updateDog(id, dog);
  };
}
