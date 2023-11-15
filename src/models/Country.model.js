module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    name: {
      type: DataTypes.STRING,
    },
    countries_isd_code: {
      type: DataTypes.TEXT,
    },
    sortName: {
      type: DataTypes.TEXT,
    },
  }, {
    underscored: true,
  });

  return Country;
};
