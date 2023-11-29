import models from '../models';

const { Industry, CustomerIndustries } = models;
export default {
  /**
   * Function to create industry
   * @param {*} req
   * @returns
   */
  async createIndustry(req) {
    try {
      const { body } = req;
      return Industry.create(body);
    } catch (error) {
      throw Error(error);
    }
  },
  /**
   * Function to get list of industry
   * @returns
   */
  async getIndustry() {
    try {
      return Industry.findAll();
    } catch (error) {
      throw Error(error);
    }
  },

  async getCustomerIndustries() {
    try {
      return CustomerIndustries.findAll();
    } catch (error) {
      throw Error(error);
    }
  },
};
