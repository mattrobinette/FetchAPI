/* eslint-disable no-param-reassign */
/* eslint-disable import/first */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { db } from '../lib/database.js';
import Constants from '../lib/constants.js';

export default class dogsModel {
  static getDogs = async () => {
    console.log('\t\t Model : getDogs()');

    return db.dbDogs().find(
      {},
      { projection: Constants.DEFAULT_PROJECTION },
    ).toArray();
  };

  static createDog = async (newDog) => {
    console.log('\t\t Model : createDog()');
    await db.dbDogs().insertOne(newDog);

    const returnDog = { ...newDog };
    // eslint-disable-next-line no-underscore-dangle
    delete returnDog._id;
    return returnDog;
  };

  static getDog = (id) => {
    console.log('\t\t Model : getDog()');
    return db.dbDogs().findOne({ id }, { projection: Constants.DEFAULT_PROJECTION });
  };

  static deleteDog = (id) => {
    console.log('\t\t Model : deleteDog()');
    return db.dbDogs().deleteOne({ id });
  };

  static replaceDog = async (id, dog) => {
    const result = await db.dbDogs().replaceOne({ id }, dog);

    if (result.matchedCount === 1) {
      return dog;
    }

    return false;
  };

  static updateDog = async (id, dog) => {
    const update = {
      $set: {},
    };

    Object.keys(dog).forEach((key) => {
      if (key === 'id') {
        return;
      }

      update.$set[key] = dog[key];
    });

    const result = await db.dbDogs().findOneAndUpdate({ id }, update, { returnDocument: 'after' });

    if (result) {
      // eslint-disable-next-line no-underscore-dangle
      delete result._id;
      return result;
    }

    return false;
  };
}
