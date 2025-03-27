const express = require('express');
const router = express.Router();
const {
  getFilters,
  addFilter,
  updateFilter,
  deleteFilter
} = require('../controllers/filterController');

router.get('/', getFilters);
router.post('/', addFilter);
router.put('/:id', updateFilter);
router.delete('/:id', deleteFilter);

module.exports = router;
