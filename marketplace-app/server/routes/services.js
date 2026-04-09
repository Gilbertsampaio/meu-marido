import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// POST /api/services — cria um novo serviço agendado
router.post('/', async (req, res) => {
  const { clientId, professionalId, serviceDate, description } = req.body;

  try {
    const [result] = await pool.execute(
      `INSERT INTO services 
       (client_id, professional_id, service_date, description, status)
       VALUES (?, ?, ?, ?, 'pendente')`,
      [clientId, professionalId, serviceDate, description]
    );

    res.status(201).json({
      id: result.insertId,
      message: 'Serviço agendado com sucesso'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao agendar serviço' });
  }
});

// GET /api/services/professional/:id — retorna serviços de um profissional
router.get('/professional/:id', async (req, res) => {
  const professionalId = req.params.id;

  try {
    const [rows] = await pool.execute(
      `SELECT s.id, s.service_date, s.description, s.status,
              u.name AS clientName, u.photo AS clientPhoto
       FROM services s
       JOIN users u ON s.client_id = u.id
       WHERE s.professional_id = ?`,
      [professionalId]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar serviços do profissional' });
  }
});

export default router;