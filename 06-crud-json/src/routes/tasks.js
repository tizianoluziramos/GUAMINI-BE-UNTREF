import { Router } from 'express';
const router = Router();
import { getAllTasks, getById } from '../services/fileStore.js';

router.get("/", (req, res, next) => {
    const tareas = getAllTasks();
    if (tareas.length === 0) {
        const error = new Error("No se encontraron tareas");
        error.status = 404;
        return next(error);
    }
    res.json(tareas);

});


router.get("/:id", (req, res, next) => {
    const { id } = req.params;
    try {
        const tarea = getById(id);
        if (!tarea) {
            const error = new Error("Tarea no encontrada");
            error.status = 404;
            return next(error);
        }
        res.json(tarea);
    } catch (error) {
        return next(error);
    }
});

router.post("/", (req, res) => {
    res.status(201).json({ message: "Tarea creada exitosamente" });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Tarea ${id} actualizada exitosamente` });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Tarea ${id} eliminada exitosamente` });
});
export default router;