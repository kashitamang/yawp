const { Router } = require('express');
const UserService = require('../services/UserService');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  //adds a new user to the users table
  .post('/', async (req, res, next) => {
    try {
      const [user, token] = await UserService.create(req.body);
      res
        .cookie(process.env.COOKIE_NAME, token, {
          httponly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ user, message: 'Sign in successful' });
    } catch (error) {
      next(error);
    }
  });
