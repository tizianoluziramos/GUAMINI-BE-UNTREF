import express from 'express';
import data from "../02-servidor-nativo-con-rutas/recipes.json" with {type: 'json'};

const PORT = 3000;

const server = express();

server.get('/', (req, res) => {
    res.send("Hola desde la ruta raíz de nuestra API");
});
server.get('about/', (req, res) => {
    res.send("Hola desde la ruta raíz de nuestra API");
});

server.get("/recipes", (req, res) => {
    res.json(data.recipes);
});

server.get("/recipes/search", (req, res) => {
    console.log(req.query);
    const { name, ingredient } = req.query;
    // const name = req.query.name
    //const ingredient = req.query.ingredient

    let filteredResults = data.recipes;
    if (name) {
        filteredResults = filteredResults.filter(r => r.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (ingredient) {
        filteredResults = filteredResults.filter(r => r.ingredients.some(i => i.toLowerCase().includes(ingredient.toLowerCase())));
    }
    if (filteredResults.length > 0) {
        res.json(filteredResults);

    } else {
        res.status(404).json({ message: 'No se encontraron recetas' });
    }
});
server.use((req, res) => {
    res.status(404).json({ message: "Ruta inexistente" });
});
server.listen(3000, (err) => {
    console.log(err ? err.message : `Server is running on http://localhost:${PORT}`);
});
