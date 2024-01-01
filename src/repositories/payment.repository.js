import models from '../models';

const axios = require('axios');

const { Transaction } = models;

// Replace 'YOUR_API_KEY' and 'YOUR_API_SECRET' with your actual Razorpay API Key and Secret

export default {
  // Function to create a Razorpay order
  async createRazorpayOrder(req) {
    try {
      const { body: { amount } } = req;
      const apiUrl = 'https://api.razorpay.com/v1/orders';

      // Set up basic authentication
      const authHeader = {
        Authorization: `Basic ${Buffer.from(`${process.env.razorpayApiKey}:${process.env.razorpayApiSecret}`).toString('base64')}`,
      };
      const data = {
        amount,
        currency: 'INR',
        receipt: 'receipt#1',
        notes: {
          key1: 'value3',
          key2: 'value2',
        },
      };

      // Make the API request and return a promise
      return new Promise((resolve, reject) => {
        axios.post(apiUrl, data, { headers: authHeader })
          .then((response) => {
            if (response.data) {
              // save data into transaction
            }
            resolve(true);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    } catch (err) {
      throw Error(err);
    }
  },

  async  getRazorpayOrderDetails(req) {
    try {
      const { body: { orderId } } = req;
      const apiUrl = `https://api.razorpay.com/v1/orders/${orderId}`;

      // Set up basic authentication
      const authHeader = {
        Authorization: `Basic ${Buffer.from(`${process.env.razorpayApiKey}:${process.env.razorpayKeySecret}`).toString('base64')}`,
      };

      // Return a promise for the API request
      return new Promise((resolve, reject) => {
        axios.get(apiUrl, { headers: authHeader })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    } catch (err) {
      throw Error(err);
    }
  },

  async getAllTransaction(req) {
    try {
      const { user } = req;
      let where = { userId: user.id };
      if (user.role === 'admin') {
        where = {};
      }
      return Transaction.findAll({ where });
    } catch (err) {
      throw Error(err);
    }
  },

};
