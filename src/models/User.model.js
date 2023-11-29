module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    permissions: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    middle_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    resume_file: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    company_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    key_skills: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    pseudoName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    govtID: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    idProofNo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    gst_number: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    pan_card_no: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    pic: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    user_state: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    postal: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    provider: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    provider_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    registration_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    referral_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    freelancer_referral: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    provider_as: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    first_time: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    anonymous: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    aboutme: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true,
    },
    designation: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    interested: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    wanttofill: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    register_as: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    user_agent: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    welcome_msg: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    last_login_ip: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    mail_subscribe: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    otp: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    reminder: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.ProfessionalDetail, {
      foreignKey: 'userId', onDelete: 'cascade',
    });
    User.hasMany(models.Certificate, {
      foreignKey: 'userId', onDelete: 'cascade',
    });
    User.hasMany(models.Education, {
      foreignKey: 'userId', onDelete: 'cascade',
    });
    User.hasMany(models.Project, {
      foreignKey: 'userId', onDelete: 'cascade',
    });
  };

  return User;
};
