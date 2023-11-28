import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import models from '../models';
import utils from '../utils/index';

import jwt from '../services/jwt.service';

const {
  User,
  ProjectDetail,
  Thumbnail,
  InternalData,
  Certificate,
  Education,
  ProfessionalDetail,
  Project,
} = models;
export default {

  async createNewUser(req) {
    try {
      const { body } = req;
      body.otp = 111111;
      body.status = 'incomplete';
      const userData = await User.findOne({
        where: { email: body.email, status: { [Op.or]: ['otpVerified', 'completed'] } },
      });
      if (userData) {
        return false;
      }
      return User.create(body);
    } catch (error) {
      throw Error(error);
    }
  },

  async verifyUserOtp(req) {
    try {
      const { body: { otp, email } } = req;
      const userData = await User.findOne({ where: { otp, email, status: 'incomplete' } });
      if (userData) {
        return await userData.update({ status: 'otpVerified' });
      }
      return false;
    } catch (error) {
      throw Error(error);
    }
  },

  async userRegistration(req) {
    try {
      const { body } = req;
      body.password = await utils.generateHashPassword(body.password);
      await User.update(body, { where: { id: body.id } });
      const token = await jwt.createToken({ id: body.id });
      return token;
    } catch (error) {
      throw Error(error);
    }
  },

  async userProjectDetail(req) {
    try {
      const { body, user: { id } } = req;
      body.userId = id;
      return ProjectDetail.create(body);
    } catch (error) {
      throw Error(error);
    }
  },

  async userCertificate(req) {
    try {
      const { body, user: { id } } = req;
      const data = body.map(async (element) => {
        const value = { userId: id, ...element };
        await Certificate.create(value);
        return true;
      });
      await Promise.all(data);
      return true;
    } catch (error) {
      throw Error(error);
    }
  },

  async addUserProject(req) {
    try {
      const { body, user: { id } } = req;
      const data = body.map(async (element) => {
        const value = { userId: id, ...element };
        await Project.create(value);
        return true;
      });
      await Promise.all(data);
      return true;
    } catch (error) {
      throw Error(error);
    }
  },
  async getUserProject(req) {
    try {
      const { user: { id } } = req;
      return Project.findAll({ where: { userId: id } });
    } catch (error) {
      throw Error(error);
    }
  },

  async getProfessionalDetail(req) {
    try {
      const { user: { id } } = req;
      return ProfessionalDetail.findAll({ where: { userId: id } });
    } catch (error) {
      throw Error(error);
    }
  },

  async getEducation(req) {
    try {
      const { user: { id } } = req;
      return Education.findAll({ where: { userId: id } });
    } catch (error) {
      throw Error(error);
    }
  },

  async getCertificate(req) {
    try {
      const { user: { id } } = req;
      return Certificate.findAll({ where: { userId: id } });
    } catch (error) {
      throw Error(error);
    }
  },

  async userProfessionalDetail(req) {
    try {
      const { body, user: { id } } = req;
      body.userId = id;
      const data = await ProfessionalDetail.findOne({ where: { userId: id } });
      if (data) {
        await data.update(body);
        return true;
      }
      await ProfessionalDetail.create(body);
      return true;
    } catch (error) {
      throw Error(error);
    }
  },

  async userEducation(req) {
    try {
      const { body, user: { id } } = req;
      const data = body.map(async (element) => {
        const value = { userId: id, ...element };
        await Education.create(value);
        return true;
      });
      await Promise.all(data);
      return true;
    } catch (error) {
      throw Error(error);
    }
  },

  async getUserDetail(req) {
    try {
      const { user } = req;
      return ProjectDetail.findAll({
        where: { userId: user.id },
        include: [
          {
            model: User,
            where: { id: user.id },
            required: true,
            attributes: {
              exclude: ['password'],
            },
          },
        ],
      });
    } catch (error) {
      throw Error(error);
    }
  },
  async compareUserPassword(password, hashPassword) {
    if (password && hashPassword) {
      const isPasswordMatch = await bcrypt.compare(password, hashPassword);
      return !!isPasswordMatch;
    }
    return false;
  },

  async login(req) {
    try {
      const { body } = req;
      const user = await User.findOne({ where: { email: body.email } });
      if (user) {
        const isPasswordMatch = await this.compareUserPassword(
          body?.password,
          user.password,
        );
        if (!isPasswordMatch) {
          return false;
        }
        const token = await jwt.createToken({ id: user.id });
        return { token, user };
      }
      return false;
    } catch (error) {
      throw Error(error);
    }
  },

  async userDetails(req) {
    try {
      const { body } = req;
      body.status = 'completed';
      await User.update(body, { where: { id: body.id } });

      const token = await jwt.createToken({ id: body.id });
      return token;
    } catch (error) {
      throw Error(error);
    }
  },

  async userThumbnail(req) {
    try {
      const { body, user: { id } } = req;
      body.userId = id;
      return Thumbnail.create(body);
    } catch (error) {
      throw Error(error);
    }
  },

  async userIntenalData(req) {
    try {
      const { body, user: { id } } = req;

      body.userId = id;
      return InternalData.create(body);
    } catch (error) {
      throw Error(error);
    }
  },

};
