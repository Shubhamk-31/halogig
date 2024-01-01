module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    clientId: {
      type: DataTypes.STRING,
    },
    freelancerId: {
      type: DataTypes.STRING,
    },
    projectId: {
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
