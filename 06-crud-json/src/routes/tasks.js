import { Router } from 'express';
const router = Router();
import { getAllTasks } from '../services/fileStore.js';

// implementar
router.get("/", (req, res) => {
    const tareas = getAllTasks();
    console.log(tareas);

});

// implementar
router.get("/:id", (req, res, next) => {
    const { id } = req.params;
    res.status(200).json({ tarea: `Tarea ${id}` });
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