module.exports = (sequelize, DataTypes) => {
  const Certificate = sequelize.define('Certificate', {
    registrationNumber: {
      type: DataTypes.STRING,
    },
    CertificationName: {
      type: DataTypes.TEXT,
    },
    fromYear: {
      type: DataTypes.TEXT,
    },
    toYear: {
      type: DataTypes.TEXT,
    },
    institute: {
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
