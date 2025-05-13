import pool from '../config/db.js';

export const createCategory = async (req, res) => {
  try {
    const { name, description = '', cover = '' } = req.body;
    const [result] = await pool.query(
      'INSERT INTO categories (name, description, cover) VALUES (?, ?, ?)',
      [name, description, cover],
    );
    res.status(201).json({ id: result.insertId, name, description, cover });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [
      id,
    ]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description = '', cover = '' } = req.body;
    const [result] = await pool.query(
      'UPDATE categories SET name = ?, description = ?, cover = ? WHERE id = ?',
      [name, description, cover, id],
    );
    res.status(200).json({ id, name, description, cover });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM categories WHERE id = ?', [id]);
    res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
