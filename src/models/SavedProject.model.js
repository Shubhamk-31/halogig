module.exports = (sequelize, DataTypes) => {
  const SavedProject = sequelize.define(
    'SavedProject',
    {
      userId: {
        type: DataTypes.STRING,
      },
      projectId: {
        type: DataTypes.TEXT,
      },
    },
    {
      underscored: true,
    },
  );

  SavedProject.associate = (models) => {
    SavedProject.belongsTo(models.ClientProject, {
      foreignKey: 'projectId', onDelete: 'cascade',
    });
  };

  return SavedProject;
};
