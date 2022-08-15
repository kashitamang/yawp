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
  })
  
  .post('/sessions', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const sessionToken = await UserService.signIn({ email, password });

      res
        .cookie(process.env.COOKIE_NAME, sessionToken, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Sign in successful' });
    } catch (error) {
      next(error);
    }
  })  
;


