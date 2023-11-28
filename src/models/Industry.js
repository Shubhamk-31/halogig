module.exports = (sequelize, DataTypes) => {
  const Industry = sequelize.define('Industry', {
    industry: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('active', 'deleted', 'inactive'),
      defaultValue: 'active',
    },
  }, {
    underscored: true,
  });

  return Industry;
};
