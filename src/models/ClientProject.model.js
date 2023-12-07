module.exports = (sequelize, DataTypes) => {
  const ClientProject = sequelize.define('ClientProject', {
    customer_industry: {
      type: DataTypes.INTEGER,
    },
    model_engagement: {
      type: DataTypes.STRING,
    },
    notice_period: {
      type: DataTypes.STRING,
    },
    posted_by_user_id: {
      type: DataTypes.INTEGER,
    },
    project_amount: {
      type: DataTypes.STRING,
    },
    project_category: {
      type: DataTypes.INTEGER,
    },
    project_duration_max: {
      type: DataTypes.STRING,
    },
    project_duration_min: {
      type: DataTypes.STRING,
    },
    project_sub_category: {
      type: DataTypes.STRING,
    },
    project_summary: {
      type: DataTypes.STRING,
    },
    project_title: {
      type: DataTypes.STRING,
    },
    sales_amount: {
      type: DataTypes.STRING,
    },
    sales_amount_to: {
      type: DataTypes.STRING,
    },
    technologty_pre: {
      type: DataTypes.STRING,
    },
    type_of_project: {
      type: DataTypes.STRING,
    },
    status: { type: DataTypes.INTEGER },
  }, {
    underscored: true,
  });

  return ClientProject;
};
