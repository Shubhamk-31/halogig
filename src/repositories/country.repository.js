import models from '../models';

const {
  Country,
  Designation,
  Technology,
} = models;

export default {

  async createCountry(req) {
    try {
      const { body } = req;
      console.log(body);
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

  async getTechnology() {
    try {
      return Technology.findAll();
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
