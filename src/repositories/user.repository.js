/* eslint-disable camelcase */
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import models from '../models';
import utils from '../utils/index';
import helper from '../helper/subQuery';

import jwt from '../services/jwt.service';

const {
  User,
  Sow,
  ProjectDetail,
  Thumbnail,
  InternalData,
  ClientProject,
  Certificate,
  ProjectBid,
  SavedProject,
  SowInput,
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
      body.role = 'user';
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
        return await savedData.destroy();
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
      body.status = 'approval';
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

  async adminUpdateUser(req) {
    try {
      const {
        body,
      } = req;
      await User.update(body, { where: { id: body.id } });
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
      await Project.delete({ where: { userId: id } });

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
      return SavedProject.findAll({
        where: { userId: id },
        limit: l,
        offset: o,
        include: [
          {
            model: ClientProject,
            required: false,
          },
        ],
      });
    } catch (error) {
      throw Error(error);
    }
  },

  async getUserClientProject(req) {
    try {
      const {
        user: { id },
        query: { limit, offset },
      } = req;
      const l = parseInt(limit, 10) || 10; // Default to 10 if not provided
      const o = parseInt(offset, 10) || 0; // Default to 0 if not provided

      return ClientProject.findAll({
        where: { posted_by_user_id: id },
        limit: l,
        offset: o,
      });
    } catch (error) {
      throw Error(error);
    }
  },

  async getUserClientProjectDetail(req) {
    try {
      const {
        params: { id },
      } = req;
      return ClientProject.findOne({ where: { id } });
    } catch (error) {
      throw Error(error);
    }
  },

  async updateProfessionalDetail(req) {
    try {
      const {
        params: { id },
        body,
      } = req;
      return ProfessionalDetail.update(body, { where: { id } });
    } catch (error) {
      throw Error(error);
    }
  },

  async updateUserProject(req) {
    try {
      const {
        params: { id },
        body,
      } = req;
      return Project.update(body, { where: { id } });
    } catch (error) {
      throw Error(error);
    }
  },

  async createProjectBid(req) {
    try {
      const { body, user } = req;
      body.from_user_id = user.id;
      return ProjectBid.create(body);
    } catch (error) {
      throw Error(error);
    }
  },

  async getUserBid(req) {
    try {
      const {
        user: { id },
        query: { limit, offset },
      } = req;
      const l = parseInt(limit, 10) || 10; // Default to 10 if not provided
      const o = parseInt(offset, 10) || 0;
      return ProjectBid.findAll({
        where: { from_user_id: id },
        include: [
          {
            model: ClientProject,
            required: false,
          },
        ],
        limit: l,
        offset: o,
      });
    } catch (error) {
      throw Error(error);
    }
  },

  async getUserBidDetail(req) {
    try {
      const {
        params: { id },
      } = req;
      return ProjectBid.findAll({
        where: { id },
        include: [
          {
            model: ClientProject,
            required: false,
          },
        ],
      });
    } catch (error) {
      throw Error(error);
    }
  },

  async updateProjectBid(req) {
    try {
      const { params: id, body } = req;
      const data = await ProjectBid.update(body, {
        where: id,
      });
      return data;
    } catch (error) {
      throw Error(error);
    }
  },

  async getClientBid(req) {
    try {
      const {
        user: { id },
        query: { limit, offset, project_id },
      } = req;
      const where = { client_id: id };
      const l = parseInt(limit, 10) || 10; // Default to 10 if not provided
      const o = parseInt(offset, 10) || 0;
      if (project_id) {
        where.project_id = project_id;
      }
      return ProjectBid.findAll({
        where,
        include: [
          {
            model: ClientProject,
            required: false,
          },
          {
            model: User,
            as: 'freelancer',
            required: false,
            attributes: {
              exclude: ['password'],
            },
          },
        ],
        attributes: {
          include: helper.bidType(),
        },
        limit: l,
        offset: o,
      });
    } catch (error) {
      throw Error(error);
    }
  },

  async getUserDetailData(req) {
    try {
      const {
        params: { id },
      } = req;
      return ProjectBid.findOne({
        where: { id },
        include: [
          {
            model: User,
            as: 'freelancer',
            required: false,
            include: [{
              model: Education,
              required: false,
            },
            {
              model: ProfessionalDetail,
              required: false,
              include: [
                {
                  model: Category,
                  required: false,
                },
                {
                  model: SubCategory,
                  required: false,
                },
              ],
            },
            {
              model: ProjectDetail,
              required: false,
            },
            {
              model: Project,
              required: false,
            },
            {
              model: ClientProject,
              required: false,
              include: [
                {
                  model: Category,
                  required: false,
                },
                {
                  model: SubCategory,
                  required: false,
                },
              ],
            },
            ],
          },
          {
            model: ClientProject,
            required: false,
          },
        ],
      });
      // return User.findOne({
      //   where: { id: 1 },

      // });
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
      const {
        params: { id },
      } = req;
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
        include: [
          {
            model: ProfessionalDetail,
            required: false,
          },
          {
            model: Certificate,
            required: false,
          },
          {
            model: Education,
            required: false,
          },
          {
            model: Project,
            required: false,
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
      const user = await User.findOne({ where: { email: body.email, role: 'user', status: 'complete' } });
      if (user) {
        console.log(user);
        if (user.status === 'approval') {
          return { message: 'approval' };
        }
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

  async createSow(req) {
    try {
      const {
        body,
        user: { id },
      } = req;
      body.user_id = id;
      const data = await Sow.create(body);
      body.inputList.inputList.map(async (element) => {
        const inputData = { ...element, sowId: data.id };
        await SowInput.create(inputData);
      });
      return data;
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  },

  async UpdateSow(req) {
    try {
      const {
        body,
        params: { id },
      } = req;
      return Sow.update(body, { where: { id } });
    } catch (error) {
      throw Error(error);
    }
  },
  async getSowDetail(req) {
    try {
      const {
        params: { id },
      } = req;
      return Sow.findOne({
        where: { id },
        include: [{
          model: SowInput,
          required: false,
        },
        {
          model: ProjectBid,
          required: false,
          as: 'bidder',
        }],
      });
    } catch (error) {
      throw Error(error);
    }
  },
  async getAllSow() {
    try {
      return Sow.findAll({
        include: [{
          model: ProjectBid,
          required: false,
        },
        {
          model: ClientProject,
          required: false,
        }, {
          model: SowInput,
          required: false,
        }],
      });
    } catch (error) {
      throw Error(error);
    }
  },
  async getAllUserSow(req) {
    try {
      const {
        user: { id },
      } = req;
      return Sow.findAll({ where: { user_id: id } });
    } catch (error) {
      throw Error(error);
    }
  },

  async deleteSow(req) {
    try {
      const {
        body,
        params: { id },
      } = req;
      body.userId = id;
      return Sow.destroy({ where: { id } });
    } catch (error) {
      throw Error(error);
    }
  },
};
