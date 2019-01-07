import express from 'express';
const router = express.Router();

router.get('/', function(req, res, next) {
  res.json({ title: 'proxy server working' });
});

module.exports = router;
