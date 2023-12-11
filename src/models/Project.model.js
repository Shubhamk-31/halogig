module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    user_id: {
      type: DataTypes.STRING,
    },
    user_project_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    project_name: {
      type: DataTypes.STRING,
    },
    project_type: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.STRING,
    },
    technologty_pre: {
      type: DataTypes.STRING,
    },
    industry: {
      type: DataTypes.STRING,
    },
    project_details: {
      type: DataTypes.STRING,
    },
    upload_file: {
      type: DataTypes.STRING,
    },
    project_link: {
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
  });
  Project.associate = (models) => {
    Project.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return Project;
};
