import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// POST /api/auth/login
router.post('/', async (req, res) => {
  const { email, password, type } = req.body;

  try {
    const [rows] = await pool.execute(
      `SELECT * FROM users WHERE email = ? AND password = ? AND type = ?`,
      [email, password, type]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const user = rows[0];

    // Se for profissional, buscar dados adicionais
    if (user.type === 'profissional') {
      const [profRows] = await pool.execute(
        `SELECT service, description, average_price AS averagePrice, rating, reviews 
         FROM professionals WHERE user_id = ?`,
        [user.id]
      );
      if (profRows.length > 0) {
        user.professionalData = profRows[0];
      }
    }

    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao autenticar usuário' });
  }
});

export default router;