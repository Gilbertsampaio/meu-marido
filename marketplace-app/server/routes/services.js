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

// Atualizar status de um serviço
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ['pendente', 'aceito', 'concluido', 'cancelado'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Status inválido' });
  }

  try {
    // Atualiza o status
    const [updateResult] = await pool.execute(
      'UPDATE services SET status = ? WHERE id = ?',
      [status, id]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }

    // Busca o serviço atualizado
    const [rows] = await pool.execute('SELECT * FROM services WHERE id = ?', [id]);

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar serviço' });
  }
});

// GET /api/services/client/:id — retorna serviços de um cliente
router.get('/client/:id', async (req, res) => {
  const clientId = req.params.id;

  try {
    const [rows] = await pool.execute(
      `SELECT s.id, s.service_date, s.description, s.status,
              u.name AS professionalName, u.photo AS professionalPhoto, p.service AS service
       FROM services s
       JOIN professionals p ON s.professional_id = p.user_id
       JOIN users u ON s.professional_id = u.id
       WHERE s.client_id = ?`,
      [clientId]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar serviços do cliente' });
  }
});

// Atualizar status de um serviço (opcional, caso o cliente também possa cancelar)
router.patch('/client/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ['pendente', 'aceito', 'concluido', 'cancelado'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ error: 'Status inválido' });
  }

  try {
    const [updateResult] = await pool.execute(
      'UPDATE services SET status = ? WHERE id = ? AND client_id = ?',
      [status, id, req.body.clientId]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Serviço não encontrado ou não pertence ao cliente' });
    }

    const [rows] = await pool.execute('SELECT * FROM services WHERE id = ?', [id]);

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar serviço do cliente' });
  }
});

export default router;