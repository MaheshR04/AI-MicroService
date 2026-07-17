const express = require('express');
const router = express.Router();

router.get('/history', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Chat History API Working"
  });
});

router.post('/send', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Chat Message Send API Working"
  });
});

module.exports = router;
