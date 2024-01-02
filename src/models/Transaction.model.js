module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    clientId: {
      type: DataTypes.STRING,
    },
    orderId: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    freelancerId: {
      type: DataTypes.INTEGER,
    },
    projectId: {
      type: DataTypes.INTEGER,
    },
    bidId: {
      type: DataTypes.INTEGER,
    },
    paymentId: {
      type: DataTypes.STRING,
    },
    signature: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
  });

  return Transaction;
};
