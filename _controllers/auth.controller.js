const express = require('express');
const router = express.Router();

const { Pool } = require('pg');

const pool = new Pool();

// @route   GET api/auth/test
// @desc    Tests auth route
// @access  Public
const test = (req, res) => res.json({ msg: 'Auth Works' });

// @route   GET api/auth/register
// @desc    Register new User
// @access  Public
const register = async (req, res) => {
  const client = await pool.connect();
  const { username, email, password, password2 } = req.body;
  const errors = {};
  // verify email
  const txFindEmail = 'SELECT * FROM users WHERE email = $1';
  const params_email = [email];

  try {
    let result = await pool.query(txFindEmail, params_email);

    console.log('result ==> ', result.rowCount);

    if (result.rowCount === 1) {
      errors.email = 'Email already exists';
      return res.status(400).send({ success: false, errors });
    }

    //
    const txInsertUser =
      'INSERT INTO users(username, email, password) values ($1, $2, $3) RETURNING *';
    const params_user = [username, email, password];
    result = await pool.query(txInsertUser, params_user);
    console.log('insert==>', result);
    const newUser = {
      id: result.rows[0].id,
      username: result.rows[0].username,
      email: result.rows[0].email,
    };
    res.status(201).send({ success: true, user: newUser });
  } catch (e) {
    res.status(500).send({ error: e.message });
  } finally {
    client.release();
  }
};

// Routes auth
router.get('/test', test);
router.post('/register', register);

module.exports = router;
