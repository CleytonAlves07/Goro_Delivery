const express = require('express');
const cors = require('cors');
const errorMiddleware = require('../middleware/errorMiddleware');
const routerLogin = require('../routes/routerLogin');
const routerProducts = require('../routes/routerProducts');
const routerSales = require('../routes/routerSales');
const routerSalesProduct = require('../routes/routerSalesProduct');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use(routerLogin);
app.use(routerProducts);
app.use(routerSales);
app.use(routerSalesProduct);

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(errorMiddleware);

module.exports = app;
