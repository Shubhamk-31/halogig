module.exports = (sequelize, DataTypes) => {
  const Certificate = sequelize.define('Certificate', {
    certificate_no: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.TEXT,
    },
    from_date: {
      type: DataTypes.TEXT,
    },
    till_date: {
      type: DataTypes.TEXT,
    },
    institutename: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
  });

  return Certificate;
};
