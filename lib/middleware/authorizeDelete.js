const Review = require('../models/Review');

module.exports = async (req, res, next) => {
  try {
    const review = await Review.getById(req.params.id);
    if (req.user.email !== 'admin' && req.user.id !== review.user_id)
      throw new Error('You are not authorized to make these kinds of decisions');
    next();
  } catch (e) {
    e.status = 403;
    next(e);
  }
};
