import pool from '../config/db.js';

// 创建分类
export const createCategory = async (req, res) => {
  try {
    const { userId, name, description = '', cover = '' } = req.body;
    const [result] = await pool.query(
      'INSERT INTO categories (user_id, name, description, cover) VALUES (?, ?, ?, ?)',
      [userId, name, description, cover],
    );
    res.status(201).json({
      id: result.insertId,
      userId,
      name,
      description,
      cover,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 获取当前用户所有分类
export const getCategories = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query(
      'SELECT * FROM categories WHERE user_id = ?',
      [userId],
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 获取某个分类
export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [
      id,
    ]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: 'Category not found or not yours' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 更新分类
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

// 删除分类（校验归属）
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM categories WHERE id = ?', [id]);
    res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
