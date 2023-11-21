module.exports = (sequelize, DataTypes) => {
    const Education = sequelize.define('Education', {
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
    }, {
      underscored: true,
    });
  
    return Education;
  };
  