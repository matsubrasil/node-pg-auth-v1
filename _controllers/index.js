const express = require('express');
const router = express.Router();

const booksController = require('./books.controller');

const test = (req, res) => {
  res.status(200).send({ message: 'FROM Controller' });
};

router.get('/', test);
router.use('/books', booksController);

module.exports = router;
