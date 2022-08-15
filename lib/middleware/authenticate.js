const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {

  try {
    //check for cookie
    const cookie = req.cookies && req.cookies[process.env.COOKIE_NAME];
    //if they dont have a cookie throw error
    if (!cookie) throw new Error('You must be signed in to continue');
    //verify its contents using jsonwebtoken
    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    //assign payload to the req.user
    req.user = user;

    next();
  } catch (err) {
    //assign an error status of unauthorized
    err.status = 401;
    next(err);
  }
};
