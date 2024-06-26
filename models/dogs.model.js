import { db } from '../lib/database.js';
import Constants from '../lib/constants.js';
import logger from '../lib/logger.js';

export default class DogsModel {
  static getDogs = async () => {
    logger.debug('getDogs', {
      location: 'model',
      function: 'getDogs',
    });

    return db.dbDogs().find(
      {},
      { projection: Constants.DEFAULT_PROJECTION },
    ).toArray();
  };

  static createDog = async (newDog) => {
    logger.debug({
      location: 'model',
      function: 'createDog',
    });

    await db.dbDogs().insertOne(newDog);

    const returnDog = { ...newDog };
    // eslint-disable-next-line no-underscore-dangle
    delete returnDog._id;
    return returnDog;
  };

  static getDog = (id) => {
    logger.debug({
      location: 'model',
      function: 'getDog',
      id,
    });
    return db.dbDogs().findOne({ id }, { projection: Constants.DEFAULT_PROJECTION });
  };

  static deleteDog = (id) => {
    logger.debug({
      location: 'model',
      function: 'deleteDog',
      id,
    });
    return db.dbDogs().deleteOne({ id });
  };

  static replaceDog = async (id, dog) => {
    logger.debug({
      location: 'model',
      function: 'replaceDog',
      id,
    });

    const result = await db.dbDogs().replaceOne({ id }, dog);

    if (result.matchedCount === 1) {
      return dog;
    }

    return false;
  };

  static updateDog = async (id, dog) => {
    logger.debug({
      location: 'model',
      function: 'updateDog',
      id,
    });

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

  static addImageToDog = async (id, imagePath) => {
    logger.debug({
      location: 'model',
      function: 'addImageToWidget',
      id,
      imagePath,
    });
    const update = {
      $push: {
        photos: imagePath,
      },
    };

    return db.dbDogs().updateOne({ id }, update);
  };
}
