const pool = require('../utils/pool');
const Restaurant = require('../models/Restaurant');
const User = require ('../models/User');

module.exports = class Review {
  id;
  stars;
  details;
  restaurant_id;
  user_id;

  constructor({ id, stars, details, restaurant_id, user_id }) {
    this.id = id;
    this.stars = stars;
    this.details = details;
    this.restaurant_id = restaurant_id;
    this.user_id = user_id;
  }

  static async insert({ stars, details, restaurant_id, user_id }) {
    const review = await Restaurant.getById(restaurant_id);
    if (!review) return null;
    const user = await User.getUserId(user_id);
    if (!user) return null;
    const { rows } = await pool.query(
      `
        INSERT INTO yawp_reviews
        (stars, details, restaurant_id, user_id)
        VALUES($1, $2, $3, $4)
        RETURNING *
        `,
      [stars, details, restaurant_id, user_id]
    );
    return new Review(rows[0]);
  }

};
