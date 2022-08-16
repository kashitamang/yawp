const { Router } = require('express');
// const UserService = require('../services/UserService');
// const authenticate = require('../middleware/authenticate');
// const authorize = require('../middleware/authorize');
const Restaurant = require('../models/Restaurant');

// const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/', async (req, res) => {
    const data = await Restaurant.getAll();
    res.json(data);
  })

  
;
