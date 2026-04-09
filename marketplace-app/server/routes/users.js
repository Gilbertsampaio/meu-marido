import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// POST /api/users
router.post('/', async (req, res) => {
    const { name, email, password, type, photo, professionalData } = req.body;

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // 1️⃣ Inserir usuário
        const [userResult] = await connection.execute(
            `INSERT INTO users (name, email, password, type, photo)
       VALUES (?, ?, ?, ?, ?)`,
            [name, email, password, type, photo]
        );

        const userId = userResult.insertId;

        // 2️⃣ Inserir dados profissionais se for profissional
        if (type === 'profissional' && professionalData) {
            const { service, description, averagePrice } = professionalData;
            await connection.execute(
                `INSERT INTO professionals (user_id, service, description, average_price, photo)
         VALUES (?, ?, ?, ?, ?)`,
                [userId, service, description, averagePrice, photo]
            );
        }

        await connection.commit();

        res.status(201).json({
            id: userId,
            message: 'Usuário criado com sucesso'
        });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
    } finally {
        connection.release();
    }
});

// GET /api/users (listar todos)
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute(`SELECT * FROM users`);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

export default router;