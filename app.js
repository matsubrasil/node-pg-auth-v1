const express = require('express');
const rootController = require('./_controllers');

const app = express();

require('dotenv').config();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/test', (req, res) => {
  res.status(200).send({ message: 'ok' });
});

app.use('/api', rootController);

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
