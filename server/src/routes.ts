import express from 'express';

const routes = express.Router();


routes.get('/', (request, response) => {
    return response.json({message:'hey wake up'});
});

export default routes;