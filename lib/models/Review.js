const pool = require('../utils/pool');
const Restaurant = require('../models/Restaurant');
const User = require ('../models/User');

module.exports = class Review {
  id;
  stars;
  details;
  restaurant_id;
  user_id;

  constructor(row) {
    this.id = row.id;
    this.stars = row.stars;
    this.details = row.details;
    this.restaurant_id = row.restaurant_id;
    this.user_id = row.user_id;
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

  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM yawp_reviews
        WHERE id = $1
        RETURNING *
        `,
      [id]
    );
    return new Review(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM yawp_reviews
      WHERE id = $1`,
      [id]
    ); 
    return new Review(rows[0]);
  }

};
