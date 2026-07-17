const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Customer API Working"
  });
});

router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: `Customer details for id ${req.params.id} Working`
  });
});

module.exports = router;
