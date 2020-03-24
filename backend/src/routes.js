const express = require('express');
const crypto = require('crypto');
const connection = require('./database/connection');

const routes = express.Router();

routes.get('/ong', async (request, response) => {
    const ongs = await connection('ong').select('*');
    return response.json({ ongs });
});

routes.post('/ong', async (request, response) => {
    const { name, email, whatsapp, city, uf } = request.body;
    const id = crypto.randomBytes(4).toString('HEX');
    await connection('ong').insert({
        id, name, email, whatsapp, city, uf
    });
    return response.json({ id });
});

module.exports = routes;
