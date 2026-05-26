import express from 'express';
import healthRouter from './src/routes/health.js';
const PORT = process.env.PORT || 3000;
const API_PREFIX = "/api/v1";
const server = express();

// health check
server.use(`${API_PREFIX}/health`, healthRouter);

server.get(`${API_PREFIX}/tasks`, (req, res) => {
    res.status(200).json({ tareas: ["Tarea 1", "Tarea 2", "Tarea 3"] });
});

server.get(`${API_PREFIX}/tasks/:id`, (req, res) => {
    const { id } = req.params;
    res.status(200).json({ tarea: `Tarea ${id}` });
});

server.post(`${API_PREFIX}/tasks`, (req, res) => {
    res.status(201).json({ message: "Tarea creada exitosamente" });
});

server.put(`${API_PREFIX}/tasks/:id`, (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Tarea ${id} actualizada exitosamente` });
});

server.delete(`${API_PREFIX}/tasks/:id`, (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Tarea ${id} eliminada exitosamente` });
});

//TODO Not Found route and Global error handler

server.listen(PORT, (err) => {
    if (err) {
        console.error('Error al iniciar el servidor:', err);
        return;
    }
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});