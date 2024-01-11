import bcrypt from 'bcryptjs';
import models from '../models';
import jwt from '../services/jwt.service';

const {
  User,
  ClientProject,
  Category,
  SubCategory,
  ProjectBid,
  ProjectDetail,
} = models;

export default {

  async getAllUser() {
    try {
      return User.findAll({
        attributes: {
          exclude: ['password'],
        },
      });
    } catch (err) {
      throw Error(err);
    }
  },

  async compareUserPassword(password, hashPassword) {
    try {
      if (password && hashPassword) {
        const isPasswordMatch = await bcrypt.compare(password, hashPassword);
        return !!isPasswordMatch;
      }
      return false;
    } catch (err) {
      throw Error(err);
    }
  },

  async adminLogin(req) {
    try {
      const { body } = req;
      const user = await User.findOne({ where: { email: body.email, role: 'admin' } });
      if (user) {
        const isPasswordMatch = await this.compareUserPassword(
          body?.password,
          user.password,
        );
        if (!isPasswordMatch) {
          return false;
        }
        const token = await jwt.createToken({ id: user.id });
        user.password = '';
        user.fullName = `${user.first_name} ${user.last_name}`;
        return {
          token,
          login_as: user.register_as,
          userKey: {
            fullName: `${user.first_name}${user.last_name}`,
            ...user.dataValues,
          },
        };
      }
      return false;
    } catch (err) {
      throw Error(err);
    }
  },

  async getClientProject() {
    try {
      return ClientProject.findAll({
        include: [
          {
            model: User,
            required: false,
            attributes: {
              exclude: ['password'],
            },
          },
          {
            model: Category,
            required: false,
          },
          {
            model: SubCategory,
            required: false,
          },
        ],
      });
    } catch (err) {
      throw Error(err);
    }
  },

  async getProjectProposal() {
    try {
      return ProjectBid.findAll({
        include: [
          {
            model: User,
            required: false,
            as: 'freelancer',
            attributes: {
              exclude: ['password'],
            },
          },
          {
            model: User,
            required: false,
            as: 'client',
            attributes: {
              exclude: ['password'],
            },
          },
          {
            model: ClientProject,
            required: false,
          },
        ],
      });
    } catch (err) {
      throw Error(err);
    }
  },

  async getUserApplication() {
    try {
      return ProjectDetail.findAll({
        include: [
          {
            model: User,
            required: false,
            attributes: {
              exclude: ['password'],
            },
          },
        ],
      });
    } catch (err) {
      throw Error(err);
    }
  },

};
