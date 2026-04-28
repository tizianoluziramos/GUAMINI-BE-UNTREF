import http from 'node:http';
import data from './recipes.json' with {type: 'json'};

const PORT = 3001;
const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    switch (url.pathname) {
        case '/':
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.end("Hola desde la ruta raíz de nuestra API");
            break;
        case '/about':
            res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
            res.end('Página de información sobre la empresa');
            break;
        case '/recipe':
            res.writeHead(200, { 'content-type': 'application/json' });
            res.end(JSON.stringify(data.recipes));
            break;
        case '/recipe/search':
            const name = url.searchParams.get("name");
            const ingredient = url.searchParams.get("ingredient");
            let filteredResults = data.recipes;
            if (name) {
                filteredResults = filteredResults.filter(r => r.name.toLowerCase().includes(name.toLowerCase()));
            }
            if (ingredient) {
                console.log('adentro de filtro ing');
                console.log(filteredResults);
                console.log(ingredient);
                filteredResults = filteredResults.filter(r => r.ingredients.some(i => i.toLowerCase().includes(ingredient.toLowerCase())));
                console.log(filteredResults);
            }

            // esta es una forma un tanto más manual
            // data.recipes.forEach(r => {
            //     if (r.name.toLowerCase().includes(name.toLowerCase())) {
            //         filteredResults.push(r);
            //     }
            // });


            if (filteredResults.length) {
                res.writeHead(200, { 'content-type': 'application/json' });
                res.end(JSON.stringify(filteredResults));

            } else {
                res.writeHead(404, { 'content-type': 'text/plain' });
                res.end("Receta No Encontrada");
            }
            break;

        default:
            res.writeHead(404, { "content-type": "text/plain" });
            res.end("Ruta no encontrada");
    }


});

server.listen(PORT, (err) => {
    console.log(err ? err.message : `Server running on http://localhost:${PORT}`);
});