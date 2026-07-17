const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth Login API Working"
  });
});

router.post('/register', (req, res) => {
  res.status(201).json({
    success: true,
    message: "Auth Register API Working"
  });
});

module.exports = router;
