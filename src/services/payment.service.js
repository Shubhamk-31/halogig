const axios = require('axios');

export default {
  async createRazorpayOrder(amount) {
    try {
      const apiUrl = 'https://api.razorpay.com/v1/orders';

      // Set up basic authentication
      const authHeader = {
        Authorization: `Basic ${Buffer.from(`${process.env.razorpayApiKey}:${process.env.razorpayApiSecret}`).toString('base64')}`,
      };
      const data = {
        amount: amount * 100,
        currency: 'INR',
        receipt: 'receipt#1',
        notes: {
          key1: 'value3',
          key2: 'value2',
        },
      };
      // Return a promise without the unnecessary async
      return new Promise((resolve, reject) => {
        // Make the API request
        axios.post(apiUrl, data, { headers: authHeader })
          .then((response) => {
            console.log(response);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error?.response?.data);
          });
      });
    } catch (err) {
      throw Error(err);
    }
  },

};
