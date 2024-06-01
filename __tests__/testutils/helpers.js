import jwt from 'jsonwebtoken';

export default {
  generateToken(secondsUntilExp = 1200) {
    return jwt.sign({ exp: Math.round(new Date().getTime() / 1000 + secondsUntilExp) }, 'test');
  },

  countRequests(mockObject) {
    return Object.keys(mockObject.history).reduce(
      (prev, method) => prev + mockObject.history[method].length,
      0
    );
  },
};
