const express = require('express');
const router = express.Router();

router.get('/performance', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Analytics Performance API Working"
  });
});

router.get('/sentiment', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Analytics Sentiment API Working"
  });
});

module.exports = router;
