module.exports = (sequelize, DataTypes) => {
  const ProjectDetail = sequelize.define('ProjectDetail', {
    userId: {
      type: DataTypes.INTEGER,
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
  ProjectDetail.associate = (models) => {
    ProjectDetail.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return ProjectDetail;
};
