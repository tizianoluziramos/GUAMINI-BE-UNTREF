import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE_PATH = join(__dirname, "../data/tasks.json");

let tasks = [];

function loadTasks() {
  try {
    const jsonData = readFileSync(FILE_PATH, "utf-8");
    tasks = JSON.parse(jsonData);
  } catch (err) {
    if (err.code !== "ENOENT") {
      const error = new Error("Error al cargar tareas: " + err.message);
      error.status = 500;
      return next(error);
    }
    save();
  }
}

// Horrible, mejor ponelo en saveTask
function save() {
  writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2), "utf-8");
}

function isDeleted(task) {
  return Boolean(task.deletedAt);
}

function getAllTasks() {
  return tasks.filter((task) => !isDeleted(task));
}

function getById(id) {
  return tasks.find((task) => task.id === id && !isDeleted(task));
}

// Mira que bonito!! jojojo
function saveTask(task) {
  tasks.push(task);
  save();
}

function deleteTask(id) {
  const task = getById(id);
  if (!task) return null;

  task.deletedAt = new Date().toISOString();
  save();
  return task;
}

function updateTask(id, data) {
  const task = getById(id);
  if (!task) return null;

  Object.assign(task, data);
  save();
  return task;
}

loadTasks();

export { getAllTasks, getById, saveTask, deleteTask, updateTask };
