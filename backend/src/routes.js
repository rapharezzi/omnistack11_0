const express = require('express');
const routes = express.Router();

routes.post('/users', (request, response) => {
    const body = request.body;
    return response.json({
        evento: "OmniStack 11.0",
        aluno: "Raphael"
    });
});

module.exports = routes;
