module.exports = (sequelize, DataTypes) => {
  const ProjectBid = sequelize.define('ProjectBid', {
    client_id: {
      type: DataTypes.INTEGER,
    },
    delivery_timeline: {
      type: DataTypes.STRING,
    },
    display_status: {
      type: DataTypes.STRING,
    },
    bid_amount: {
      type: DataTypes.STRING,
    },
    from_user_id: {
      type: DataTypes.INTEGER,
    },
    lead_status: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.STRING,
    },
    notify: {
      type: DataTypes.STRING,
    },
    project_id: {
      type: DataTypes.INTEGER,
    },
    sales_comm_amount: {
      type: DataTypes.STRING,
    },
    subject: {
      type: DataTypes.STRING,
    },
    technologty_pre: {
      type: DataTypes.STRING,
    },
    total_proposal_value: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
  }, {
    underscored: true,
  });
  ProjectBid.associate = (models) => {
    ProjectBid.belongsTo(models.User, {
      foreignKey: 'from_user_id',
      as: 'freelancer',
    });
    ProjectBid.belongsTo(models.ClientProject, {
      foreignKey: 'project_id',
    });
  };
  return ProjectBid;
};
