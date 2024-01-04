import bcrypt from 'bcryptjs';
import models from '../models';
import jwt from '../services/jwt.service';

const {
  User,
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
      console.log(3333333);
      if (password && hashPassword) {
        console.log(3332222, password, hashPassword);
        const isPasswordMatch = await bcrypt.compare(password, hashPassword);
        console.log(isPasswordMatch);
        return !!isPasswordMatch;
      }
      return false;
    } catch (err) {
      console.log(err);
      throw Error(err);
    }
  },

  async adminLogin(req) {
    try {
      const { body } = req;
      const user = await User.findOne({ where: { email: body.email, role: 'admin' } });
      if (user) {
        console.log(1222);
        const isPasswordMatch = await this.compareUserPassword(
          body?.password,
          user.password,
        );
        console.log(44444);
        if (!isPasswordMatch) {
          return false;
        }
        const token = await jwt.createToken({ id: user.id });
        console.log(343434);
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

};
