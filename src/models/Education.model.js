module.exports = (sequelize, DataTypes) => {
  const Education = sequelize.define('Education', {
    bachelor: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.STRING,
    },
    bachelorUniversity: {
      type: DataTypes.STRING,
    },
    bachelorFrom: {
      type: DataTypes.STRING,
    },
    bachelorTo: {
      type: DataTypes.STRING,
    },
    bachelorType: {
      type: DataTypes.STRING,
    },
    master: {
      type: DataTypes.STRING,
    },
    masterUniversity: {
      type: DataTypes.STRING,
    },
    masterFrom: {
      type: DataTypes.STRING,
    },
    masterTo: {
      type: DataTypes.STRING,
    },
    masterType: {
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
  });

  return Education;
};
