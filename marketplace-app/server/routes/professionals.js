import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET /api/professionals
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT u.id AS userId, u.name, u.photo, p.service, p.description, p.average_price AS averagePrice,
              p.rating, p.reviews
       FROM users u
       JOIN professionals p ON u.id = p.user_id`
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar profissionais' });
  }
});

// GET /api/professionals/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.execute(
      `SELECT u.id AS userId, u.name, u.photo, p.service, p.description, p.average_price AS averagePrice,
              p.rating, p.reviews
       FROM users u
       JOIN professionals p ON u.id = p.user_id
       WHERE u.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Profissional não encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar profissional' });
  }
});

export default router;