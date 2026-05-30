import { Router } from "express";
import crypto from "node:crypto";
import isUuid from "uuid-validate";
import {
  deleteTask,
  getAllTasks,
  getById,
  saveTask,
  updateTask,
} from "../services/fileStore.js";

const router = Router();

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

// implementar
/*
Notas: 
1. El campo id debe ser unico y generado automáticamente (debe ser un UUID)-> crypto.randomUUID() para generar un id único
2. El campo title es obligatorio y debe ser una cadena de texto no vacia.
3. El campo description es opcional y puede ser una cadena de texto. Si el usuario no envía este campo, se debe establecer como una cadena vacía ("").
4. El campo priority es "low", "mid" o "high", y por defecto debe ser "low". Si el usuario no envía este campo, se debe establecer como "low". OPCIONAL: Si el usuario envía un valor que no es "low", "mid" o "high", se debe responder con un error 400 Bad Request. 
4. El campo completed es un booleano que indica si la tarea está completada o no, y por defecto debe ser false. El usuario no envía un valor inicial.
5. Los campos createdAt y updatedAt deben ser generados automáticamente por el servidor al crear o actualizar una tarea, respectivamente. El usuario no envía estos campos en la solicitud. Ejemplo: new Date().toISOString() para generar la fecha actual en formato ISO 8601.

*/

router.post("/", (req, res, next) => {
  try {
    const { title, description = "", priority = "low" } = req.body;
    const prioridades = ["low", "mid", "high"];

    if (typeof title !== "string" || title.trim() === "") {
      const error = new Error(
        "El campo title es obligatorio y debe ser una cadena de texto",
      );
      error.status = 400;
      return next(error);
    }

    if (!prioridades.includes(priority)) {
      const error = new Error("El campo priority debe ser low, mid o high");
      error.status = 400;
      return next(error);
    }

    if (typeof description !== "string") {
      const error = new Error(
        "El campo description debe ser una cadena de texto",
      );
      error.status = 400;
      return next(error);
    }

    const fecha_creacion = new Date().toISOString();
    const tarea = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      completed: false,
      createdAt: fecha_creacion,
      updatedAt: fecha_creacion,
    };

    saveTask(tarea);
    const tareaGuardada = getById(tarea.id);

    res.status(201).json({
      status: 201,
      message: "Tarea creada exitosamente",
      data: tareaGuardada,
    });
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Tarea ${id} actualizada exitosamente` });
});

// HECHO y derecho

router.patch("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isUuid(id)) {
      const error = new Error("Id debe ser un UUID valido");
      error.status = 400;
      return next(error);
    }

    const { title, description, priority, completed } = req.body;
    const prioridades = ["low", "mid", "high"];
    const data = {};

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim() === "") {
        const error = new Error(
          "El campo title debe ser una cadena de texto no vacia",
        );
        error.status = 400;
        return next(error);
      }
      data.title = title.trim();
    }

    if (description !== undefined) {
      if (typeof description !== "string") {
        const error = new Error(
          "El campo description debe ser una cadena de texto",
        );
        error.status = 400;
        return next(error);
      }
      data.description = description;
    }

    if (priority !== undefined) {
      if (!prioridades.includes(priority)) {
        const error = new Error("El campo priority debe ser low, mid o high");
        error.status = 400;
        return next(error);
      }
      data.priority = priority;
    }

    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        const error = new Error("El campo completed debe ser booleano");
        error.status = 400;
        return next(error);
      }
      data.completed = completed;
    }

    data.updatedAt = new Date().toISOString();

    const updatedTask = updateTask(id, data);
    if (!updatedTask) {
      const error = new Error("Tarea no encontrada");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      status: 200,
      message: `Tarea ${id} actualizada exitosamente`,
      data: updatedTask,
    });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isUuid(id)) {
      const error = new Error("Id debe ser un UUID valido");
      error.status = 400;
      return next(error);
    }
    const deletedTask = deleteTask(id);

    if (!deletedTask) {
      const error = new Error("Tarea no encontrada");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      status: 200,
      message: `Tarea ${id} eliminada exitosamente`
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
