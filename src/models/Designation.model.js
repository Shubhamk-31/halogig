module.exports = (sequelize, DataTypes) => {
  const Designation = sequelize.define('Designation', {
    name: {
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
  });

  return Designation;
};
