module.exports = (sequelize, DataTypes) => {
  const InternalData = sequelize.define('InternalData', {
    title: {
      type: DataTypes.STRING,
    },
    appId: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    images: {
      type: DataTypes.TEXT,
    },
  }, {
    underscored: true,
  });

  return InternalData;
};
