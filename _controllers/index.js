const express = require('express');
const router = express.Router();

const booksController = require('./books.controller');
const authController = require('./auth.controller');

const test = (req, res) => {
  res.status(200).send({ message: 'FROM Controller' });
};
// base_url/api/...
router.get('/', test);
router.use('/books', booksController);
router.use('/auth', authController);

module.exports = router;
