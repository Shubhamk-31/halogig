import models from '../models';
import paymentService from '../services/payment.service';

const axios = require('axios');

const { Transaction, ProjectBid } = models;

// Replace 'YOUR_API_KEY' and 'YOUR_API_SECRET' with your actual Razorpay API Key and Secret

export default {
  // Function to create a Razorpay order
  async createRazorpayOrder(req) {
    try {
      const { body: { bidId }, user } = req;
      const bidData = await ProjectBid.findOne({ where: { id: bidId } });
      const data = await paymentService.createRazorpayOrder(bidData.dataValues.bid_amount);
      if (data.id) {
        const transactionData = {
          orderId: data.id,
          clientId: user.id,
          amount: bidData.dataValues.bid_amount,
          freelancerId: bidData.dataValues.from_user_id,
          status: 'pending',
          projectId: bidData.dataValues.project_id,
          bidId,
        };
        await Transaction.create(transactionData);
      }
      return data;
    } catch (err) {
      throw Error(err);
    }
  },

  async updatePaymentStatus(req) {
    try {
      const { body } = req;
      let data = {};
      if (body.razorpay_signature && body.razorpay_payment_id) {
        data = { status: 'success', paymentId: body.razorpay_payment_id, signature: body.razorpay_signature };
        const transactionData = await Transaction.findOne(
          { where: { orderId: body.razorpay_order_id } },
        );
        console.log(transactionData);
        await ProjectBid.update({ status: 'accepted' }, { where: { id: transactionData.bidId } });
      } else {
        data = { status: 'failed' };
      }
      return Transaction.update(data, { where: { orderId: body.razorpay_order_id } });
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
