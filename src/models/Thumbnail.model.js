module.exports = (sequelize, DataTypes) => {
  const Thumbnail = sequelize.define('Thumbnail', {
    title: {
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

  return Thumbnail;
};
