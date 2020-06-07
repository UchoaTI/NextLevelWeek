import { Request, Response } from 'express';
import knex from '../database/connection';


class PointsController {
    async index(request: Request, response: Response){
        const {city, uf , itens} = request.query;

        const parsedItens = String(itens)
            .split(',')
            .map(iten=> Number(iten.trim()));
        
        const points = await knex('points')
            .join('point_itens', 'points.id', '=', 'point_itens.point_id')
            .whereIn('point_itens.iten_id', parsedItens)
            .where('city',String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return response.json(points);
   }

    async show(request: Request, response: Response) {
        const { id } = request.params;
    
        const point = await knex('points').where('id', id).first();

        if (!point){
            return response.status(400).json({message: 'point not found.'});
        }

        const itens= await knex('itens')
            .join('point_itens', 'itens.id', '=', 'point_itens.iten_id')
            .where('point_itens.point_id',id)
            .select('itens.title');

        return response.json({point, itens});
    }

    async create(request: Request, response: Response) {
        {
            const {
                name,
                email,
                whatsapp,
                latitude,
                longitude,
                city,
                uf,
                itens
            } = request.body;

            const trx = await knex.transaction();

            const point = {
                image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
                name,
                email,
                whatsapp,
                latitude,
                longitude,
                city,
                uf
            }

            const inseterdIds = await trx('points').insert(point);

            const point_id = inseterdIds[0];

            const pointItens = itens.map((iten_id: number) => {
                return {
                    iten_id,
                    point_id,
                };
            })

            await trx('point_itens').insert(pointItens);

            await trx.commit();

            return response.json({
                id: point_id,
                ...point,
            });
        }

    }
}

export default PointsController;