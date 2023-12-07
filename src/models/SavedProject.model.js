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

  return SavedProject;
};
