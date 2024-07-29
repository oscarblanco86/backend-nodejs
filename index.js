// console.log("My App");
const express = require('express');
const routerApi = require('./routes');

const { logErrors, errorHandlerlogErrors, boomHandlerlogErrors } = require('./middlewares/error.handler');

// const router = require('./routes/products.router');

const app = express();
const port = 8080;

app.use(express.json());

app.get('/', (req,res) => {
  res.send('Hola mi server en express created by oscar')
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomHandlerlogErrors);
app.use(errorHandlerlogErrors);


app.listen(port, () => {
  console.log('mi port ' + port);
});


