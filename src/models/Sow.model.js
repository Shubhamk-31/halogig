module.exports = (sequelize, DataTypes) => {
  const Sow = sequelize.define(
    'Sow',
    {
      user_id: {
        type: DataTypes.INTEGER,
      },
      project_leads_id: {
        type: DataTypes.INTEGER,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // Use allowNull instead of required
      },
      customer_objective: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hours_proposed: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      scope_of_work: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      remarks: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'active',
      },
    },
    {
      underscored: true,
    },
  );
  Sow.associate = (models) => {
    Sow.hasMany(models.SowInput, {
      foreignKey: 'sowId',
    });
    Sow.belongsTo(models.ProjectBid, {
      foreignKey: 'project_leads_id',
      targetKey: 'id',
      as: 'bidder',
    });
  };
  return Sow;
};
