module.exports = (sequelize, DataTypes) => {
  const ProjectDetail = sequelize.define('ProjectDetail', {
    userId: {
      type: DataTypes.STRING,
    },
    appName: {
      type: DataTypes.STRING,
    },
    industry: {
      type: DataTypes.STRING,
    },
    softwareVersion: {
      type: DataTypes.STRING,
    },
    technology: {
      type: DataTypes.STRING,
    },
    features: {
      type: DataTypes.STRING,
    },
    deliveryTime: {
      type: DataTypes.STRING,
    },
    sourceCode: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
  });

  return ProjectDetail;
};
