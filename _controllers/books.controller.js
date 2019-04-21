const express = require('express');
const router = express.Router();

const { Pool } = require('pg');

const pool = new Pool();

const getAll = async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM books');
    const books = await result.rows;
    res.status(200).send({ books });
  } catch (e) {
    res.status(500).send({ error: e.message });
  } finally {
    client.release();
  }
};

const create = async (req, res) => {
  const client = await pool.connect();
  //const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
  const { title, authors } = req.body;
  const text = 'INSERT INTO books(title, authors) values ($1, $2) RETURNING *';
  const values = [title, authors];
  try {
    const result = await pool.query(text, values);
    //console.log(result.rows[0]);
    res.status(201).send({ message: result.rows[0] });
  } catch (e) {
    res.status(500).send({ error: e.message });
  } finally {
    client.release();
  }
};

const getById = async (req, res) => {
  const client = await pool.connect();

  const { id } = req.params;
  const text = 'SELECT * FROM books WHERE book_id=$1';
  const values = [id];

  try {
    const result = await client.query(text, values);
    //console.log(result.rowCount);
    const books = await result.rows;

    if (result.rowCount === 0)
      return res.status(400).send({ success: false, error: 'Book not found' });

    res.status(200).send({ books });
  } catch (e) {
    res.status(500).send({ error: e.message });
  } finally {
    client.release();
  }
};

const update = async (req, res) => {
  const client = await pool.connect();

  const { id } = req.params;
  const { title, authors } = req.body;
  const text = 'UPDATE books SET title=$2, authors=$3 WHERE book_id=$1';
  const values = [id, title, authors];

  try {
    const result = await client.query(text, values);
    //console.log(result);
    if (result.rowCount === 0)
      return res.status(400).send({ success: false, error: 'Book not found' });

    //ok
    res
      .status(200)
      .send({ success: true, message: 'Book updated successfully' });
  } catch (e) {
    res.status(500).send({ error: e.message });
  } finally {
    client.release();
  }
};

const remove = async (req, res) => {
  const client = await pool.connect();

  const { id } = req.params;
  const text = 'DELETE FROM books WHERE book_id=$1';
  const values = [id];
  try {
    const result = await client.query(text, values);
    // console.log(result.rowCount);
    if (result.rowCount === 0)
      return res.status(400).send({ success: false, error: 'Book not found' });

    //ok
    res
      .status(200)
      .send({ success: true, message: 'Book removed successfully' });
  } catch (e) {
    res.status(500).send({ error: e.message });
  } finally {
    client.release();
  }
};

router.get('/', getAll);
router.post('/', create);
router.get('/:id', getById);
router.delete('/:id', remove);
router.put('/:id', update);

module.exports = router;
