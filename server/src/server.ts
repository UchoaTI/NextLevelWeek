import express from 'express';

const app = express();

//GET : buscar uma ou mais informações do back-end
//Post : criar uma nova informação no back-end
//PUT : Atualizar uma informção existente
//Delete : Remover

//

app.get('/users', (request, response) => {
    console.log('lista')


    response.json([
        'diero',
        'daniel'

    ]);
});

app.listen(3333);