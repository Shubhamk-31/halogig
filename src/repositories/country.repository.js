import models from '../models';

const {
  Country,
  Designation,
} = models;

export default {

  async createCountry(req) {
    try {
      const { body } = req;
      return Country.create(body);
    } catch (err) {
      throw Error(err);
    }
  },

  async getAllCountry() {
    try {
      return Country.findAll();
    } catch (err) {
      throw Error(err);
    }
  },
  async getDesignation() {
    try {
      return Designation.findAll();
    } catch (err) {
      throw Error(err);
    }
  },
};
