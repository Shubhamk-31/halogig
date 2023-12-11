module.exports = (sequelize, DataTypes) => {
  const ProfessionalDetail = sequelize.define('ProfessionalDetail', {
    userId: {
      type: DataTypes.INTEGER,
    },
    professional_experience_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    profile_headline: {
      type: DataTypes.STRING,
    },
    project_category: {
      type: DataTypes.STRING,
    },
    project_sub_category: {
      type: DataTypes.STRING,
    },
    technologty_pre: {
      type: DataTypes.STRING,
    },
    model_engagement: {
      type: DataTypes.STRING,
    },
    rateperhour: {
      type: DataTypes.INTEGER,
    },
    rateperhour_2: {
      type: DataTypes.STRING,
    },
    support_project: {
      type: DataTypes.STRING,
    },
    development_project: {
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
  });
  ProfessionalDetail.associate = (models) => {
    ProfessionalDetail.belongsTo(models.User, {
      foreignKey: 'userId', onDelete: 'cascade',
    });
  };
  return ProfessionalDetail;
};
