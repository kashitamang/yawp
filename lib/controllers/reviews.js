const { Router } = require('express');
const Review = require('../models/Review');
const authenticate = require('../middleware/authenticate');
const authorizeDelete = require('../middleware/authorizeDelete');

module.exports = Router()
  .delete('/:id', authenticate, authorizeDelete, async (req, res, next) => {
    try {
      const data = await Review.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
  );
