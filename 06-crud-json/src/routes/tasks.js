import { Router } from 'express';
const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({ tareas: ["Tarea 1", "Tarea 2", "Tarea 3"] });
});

router.get("/:id", (req, res, next) => {
    const { id } = req.params;
    if (id === "1") {
        const error = new Error("se produjo un error al obtener la tarea");
        error.status = 500;
        return next(error);
    }
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