'use strict';
const colors = require('./src/utilities/colors');

const SCHEMA = process.env.SCHEMA || 'http';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8081;

const livereload = require("livereload");
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
// const axios = require('axios');

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, './'));
const connectLivereload = require("connect-livereload");

const app = express();

app.use(connectLivereload());

app.disable('x-powered-by');

app.use(cors());
app.use(helmet());

app.use(
    express.json({
        strict: true,
        limit: '50mb'
    })
);

app.use(express.static('./'));

app.get(`*`, (req, res, next) => {
    try {
        res.status(200).sendFile('index.html', {
            root: path.join(__dirname, './')
        });
    } catch (err) {
        next(err);
    }
});

app.post('/', (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.patch('/', (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.delete('/', (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((req, res, next) => {
    const err = new Error('Not Implemented');
    err.status = 501;
    next(err);
});

app.use((err, req, res,) => {
    res.status(err.status).send(err.message);
});

app.listen(PORT, () => {
    console.log(
        `${colors.fCyan}[CL-APP]${colors.reset} Listening at ${colors.fGreen}${SCHEMA}://${HOST}:${PORT}${colors.reset}`
    );
});

module.exports = app;
