const { Router } = require('express');
// const UserService = require('../services/UserService');
const authenticate = require('../middleware/authenticate');
// const authorize = require('../middleware/authorize');
const Restaurant = require('../models/Restaurant');
const Review = require('../models/Review');

// const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/', async (req, res) => {
    const restaurants = await Restaurant.getAll();

    const ids = restaurants.map((restaurant) => ({
      id: restaurant.id,
      name: restaurant.name,
    }));
    res.json(ids);
  })
  .get('/:id', async (req, res) => {
    const data = await Restaurant.getById(req.params.id);
    await data.getReviewsByRestaurantId();
    res.json(data);
  })
  .post('/:id/reviews', authenticate, async (req, res, next) => {
    try {
      const data = await Review.insert({
        restaurant_id: req.params.id,
        user_id: req.user.id,
        ...req.body,
      });
      console.log('req.params.id', req.params.id);
      console.log('req.user.id', req.user.id);


      res.json(data);
    } catch (e) {
      next(e);
    }
  });
