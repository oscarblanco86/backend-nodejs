// console.log("My App");
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/auth.handler');

const { logErrors, errorHandlerlogErrors, boomHandlerlogErrors, ormErrorHandler } = require('./middlewares/error.handler');

// const router = require('./routes/products.router');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080','https://myapp.co'];
const options = {
  origin: (origin,callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors());
require('./utils/auth');

app.get('/api', (req,res) => {
  res.send('Hola mi server en express created by oscar')
  // res.send('/index.html');
});

app.get('/api/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Hola soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomHandlerlogErrors);
app.use(errorHandlerlogErrors);


app.listen(port, () => {
  console.log('mi port ' + port);
});


