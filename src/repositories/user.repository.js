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
  ClientProject,
  Certificate,
  SavedProject,
  Education,
  ProfessionalDetail,
  Project,
  Category,
  SubCategory,
} = models;
export default {
  async createNewUser(req) {
    try {
      const { body } = req;
      body.otp = 111111;
      body.status = 'incomplete';
      const userData = await User.findOne({
        where: {
          email: body.email,
          status: { [Op.or]: ['otpVerified', 'completed'] },
        },
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
      const {
        body: { otp, email },
      } = req;
      const userData = await User.findOne({
        where: { otp, email, status: 'incomplete' },
      });
      if (userData) {
        return await userData.update({ status: 'otpVerified' });
      }
      return false;
    } catch (error) {
      throw Error(error);
    }
  },

  async savedProject(req) {
    try {
      const {
        body: { projectId },
        user: { id },
      } = req;
      const savedData = await SavedProject.findOne({
        where: { userId: id, projectId },
      });
      if (savedData) {
        return await savedData.delete();
      }
      return SavedProject.create({ userId: id, projectId });
      // return true;
    } catch (error) {
      throw Error(error);
    }
  },

  async userRegistration(req) {
    try {
      const { body } = req;
      if (body.password) {
        body.password = await utils.generateHashPassword(body.password);
      }
      console.log(
        '🚀 ~ file: user.repository.js:59 ~ userRegistration ~ body:',
        body,
      );
      await User.update(body, { where: { id: body.id } });
      const token = await jwt.createToken({ id: body.id });
      return token;
    } catch (error) {
      throw Error(error);
    }
  },

  async updateUser(req) {
    try {
      const {
        body,
        user: { id },
      } = req;
      await User.update(body, { where: { id } });
      return true;
    } catch (error) {
      throw Error(error);
    }
  },

  async userProjectDetail(req) {
    try {
      const {
        body,
        user: { id },
      } = req;
      console.log(123);
      body.userId = id;
      return ProjectDetail.create(body);
    } catch (error) {
      throw Error(error);
    }
  },

  async userCertificate(req) {
    try {
      const {
        body,
        user: { id },
      } = req;
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
      const {
        body,
        user: { id },
      } = req;
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
      const {
        user: { id },
      } = req;
      return Project.findAll({ where: { userId: id } });
    } catch (error) {
      throw Error(error);
    }
  },

  async getProfessionalDetail(req) {
    try {
      const {
        user: { id },
      } = req;
      return ProfessionalDetail.findOne({ where: { userId: id } });
    } catch (error) {
      throw Error(error);
    }
  },

  async getEducation(req) {
    try {
      const {
        user: { id },
      } = req;
      return Education.findAll({ where: { userId: id } });
    } catch (error) {
      throw Error(error);
    }
  },

  async createClientProject(req) {
    try {
      const {
        user: { id },
        body,
      } = req;
      body.posted_by_user_id = id;
      body.status = 1;
      return ClientProject.create(body);
    } catch (error) {
      throw Error(error);
    }
  },

  async getSavedProject(req) {
    try {
      const {
        user: { id },
        query: { limit, offset },
      } = req;

      const l = parseInt(limit, 10) || 10; // Default to 10 if not provided
      const o = parseInt(offset, 10) || 0; // Default to 0 if not provided
      return SavedProject.findAll({ where: { userId: id }, limit: l, offset: o });
    } catch (error) {
      throw Error(error);
    }
  },

  async getUserClientProject(req) {
    try {
      const {
        user: { id },
        query: {
          limit,
          offset,
        },
      } = req;
      const l = parseInt(limit, 10) || 10; // Default to 10 if not provided
      const o = parseInt(offset, 10) || 0; // Default to 0 if not provided

      return ClientProject.findAll(
        {
          where: { posted_by_user_id: id },
          limit: l,
          offset: o,
        },
      );
    } catch (error) {
      throw Error(error);
    }
  },

  async updateProfessionalDetail(req) {
    try {
      const {
        params: { id }, body,
      } = req;
      return ProfessionalDetail.update(body, { where: { id } });
    } catch (error) {
      throw Error(error);
    }
  },

  async updateUserProject(req) {
    try {
      const {
        params: { id }, body,
      } = req;
      return Project.update(body, { where: { id } });
    } catch (error) {
      throw Error(error);
    }
  },

  async getCertificate(req) {
    try {
      const {
        user: { id },
      } = req;
      return Certificate.findAll({ where: { userId: id } });
    } catch (error) {
      throw Error(error);
    }
  },

  async userProfessionalDetail(req) {
    try {
      const {
        body,
        user: { id },
      } = req;
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

  async getAllProfessionalDetail(req) {
    try {
      const {
        query: {
          category, subCategory, min, max, model, technology,
        },
      } = req;
      // console.log(data);
      const where = {};

      if (category) {
        where.project_category = category;
      }
      if (subCategory) {
        where.project_sub_category = subCategory;
      }
      // rate min
      if (min) {
        where.project_amount = { [Op.gte]: min };
      }
      // rate max
      if (max) {
        where.project_amount = { [Op.lte]: max };
      }
      // min and max
      if (min && max) {
        where.project_amount = { [Op.between]: [min, max] };
      }
      // technology
      if (model) {
        where.type_of_project = model;
      }

      if (technology) {
        where.technologty_pre = { [Op.substring]: technology };
      }
      return ClientProject.findAll({ where });
    } catch (error) {
      throw Error(error);
    }
  },

  async userEducation(req) {
    try {
      const {
        body,
        user: { id },
      } = req;
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

  async userApplicationDetail(req) {
    try {
      const {
        params: { id },
      } = req;
      return ProjectDetail.findOne({
        where: { id },
      });
    } catch (error) {
      throw Error(error);
    }
  },

  async getAllCategory() {
    try {
      return Category.findAll();
    } catch (error) {
      throw Error(error);
    }
  },

  async getAllSubCategory(req) {
    try {
      const { params: { id } } = req;
      return SubCategory.findAll({ where: { categoryId: id } });
    } catch (error) {
      throw Error(error);
    }
  },

  async userApplication(req) {
    try {
      const {
        user: { id },
      } = req;
      return ProjectDetail.findAll({
        where: { userId: id },
      });
    } catch (error) {
      throw Error(error);
    }
  },

  async getUserDetail(req) {
    try {
      const { user } = req;
      return User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [{
          model: ProfessionalDetail,
          required: false,
        }, {
          model: Certificate,
          required: false,
        }, {
          model: Education,
          required: false,
        }, {
          model: Project,
          required: false,
        }],
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
        user.password = '';
        user.fullName = `${user.first_name}${user.last_name}`;
        console.log(user.fullName);
        // const userData = { fullName: '123123' };
        return { token, login_as: user.register_as, userKey: { fullName: `${user.first_name}${user.last_name}`, ...user.dataValues } };
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
      const {
        body,
        user: { id },
      } = req;
      body.userId = id;
      return Thumbnail.create(body);
    } catch (error) {
      throw Error(error);
    }
  },

  async userIntenalData(req) {
    try {
      const {
        body,
        user: { id },
      } = req;

      body.userId = id;
      return InternalData.create(body);
    } catch (error) {
      throw Error(error);
    }
  },

  async updateInternalData(req) {
    try {
      const {
        body,
        params: { id },
      } = req;
      return InternalData.update(body, { where: { id } });
    } catch (error) {
      throw Error(error);
    }
  },

  async updateThumbnail(req) {
    try {
      const {
        params: { id },
        body,
      } = req;
      return Thumbnail.update(body, { where: { id } });
    } catch (error) {
      throw Error(error);
    }
  },
};
