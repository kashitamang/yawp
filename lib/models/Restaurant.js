const pool = require('../utils/pool');

module.exports = class Restaurant {
  id;
  name;
  type;

  constructor({ id, name, type }) {
    this.id = id;
    this.name = name;
    this.type = type;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from yawp_restaurants');
    return rows.map((row) => new Restaurant(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * FROM yawp_restaurants WHERE id = $1`,
      [id]
    );
    return new Restaurant(rows[0]);
  }

  //get review by restaurant id
  async getReviewsByRestaurantId() {
    const { rows } = await pool.query(
      `SELECT yawp_reviews.id, stars, details 
        from yawp_restaurants
        LEFT JOIN yawp_reviews on yawp_restaurants.id = yawp_reviews.restaurant_id
        WHERE yawp_reviews.restaurant_id = $1`, [this.id]);

    this.reviews = rows;
    return this;
  }
};
