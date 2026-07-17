const express = require('express');
const router = express.Router();

router.get('/summary', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Dashboard Summary API Working"
  });
});

module.exports = router;
