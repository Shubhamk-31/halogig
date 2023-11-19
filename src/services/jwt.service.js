import jwt from 'jsonwebtoken';

export default {
  async createToken(payload) {
    console.log(payload);
    return jwt.sign(payload, 'hfhyrbhfjj123', { expiresIn: '24h' });
  },
  verifyToken(token) {
    return jwt.verify(token, 'hfhyrbhfjj123', {
      expiresIn: '24h',
    });
  },
  decodeToken(token) {
    return jwt.decode(token, {
      complete: true,
    });
  },
};
