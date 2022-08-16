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

  static async getAll(){
    const { rows } = await pool.query('SELECT (name) from yawp_restaurants');
    return rows.map((row) => new Restaurant(row));
  }
};
