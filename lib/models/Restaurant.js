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

  //get reviews by restaurant
};
