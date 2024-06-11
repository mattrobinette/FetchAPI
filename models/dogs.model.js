/* eslint-disable no-param-reassign */
/* eslint-disable import/first */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { db } from '../lib/database.js';
import Constants from '../lib/constants.js';

export default class dogsModel {
  static getdogs = async () => {
    console.log('\t\t Model : getdogs()');

    return db.dbdogs().find(
      {},
      { projection: Constants.DEFAULT_PROJECTION },
    ).toArray();
  };

  static createdog = async (newdog) => {
    console.log('\t\t Model : createdog()');
    await db.dbdogs().insertOne(newdog);

    const returndog = { ...newdog };
    // eslint-disable-next-line no-underscore-dangle
    delete returndog._id;
    return returndog;
  };

  static getdog = (id) => {
    console.log('\t\t Model : getdog()');
    return db.dbdogs().findOne({ id }, { projection: Constants.DEFAULT_PROJECTION });
  };

  static deletedog = (id) => {
    console.log('\t\t Model : deletedog()');
    return db.dbdogs().deleteOne({ id });
  };

  static replacedog = async (id, dog) => {
    const result = await db.dbdogs().replaceOne({ id }, dog);

    if (result.matchedCount === 1) {
      return dog;
    }

    return false;
  };

  static updatedog = async (id, dog) => {
    const update = {
      $set: {},
    };

    Object.keys(dog).forEach((key) => {
      if (key === 'id') {
        return;
      }

      update.$set[key] = dog[key];
    });

    const result = await db.dbdogs().findOneAndUpdate({ id }, update, { returnDocument: 'after' });

    if (result) {
      // eslint-disable-next-line no-underscore-dangle
      delete result._id;
      return result;
    }

    return false;
  };
}
