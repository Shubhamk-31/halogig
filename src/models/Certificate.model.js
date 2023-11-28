module.exports = (sequelize, DataTypes) => {
  const Certificate = sequelize.define('Certificate', {
    certificate_no: {
      type: DataTypes.STRING,
    },
    certificate_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    from_date: {
      type: DataTypes.STRING,
    },
    till_date: {
      type: DataTypes.STRING,
    },
    institutename: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
  });

  return Certificate;
};
