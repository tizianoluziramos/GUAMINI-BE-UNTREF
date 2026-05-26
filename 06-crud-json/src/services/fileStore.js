// Módulo de persistencia: maneja la lectura y escritura de tareas en un archivo JSON
// Mantiene una copia en memoria que se sincroniza con el archivo.

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const FILE_PATH = join(__dirname, '../data/tasks.json');

let tasks = [];

// Cargar tareas desde el archivo al iniciar el servidor
function loadTasks() {
    const jsonData = readFileSync(FILE_PATH, 'utf-8');
    tasks = JSON.parse(jsonData);
}

function getAllTasks() {
    return [...tasks];
}
loadTasks();

export { getAllTasks };