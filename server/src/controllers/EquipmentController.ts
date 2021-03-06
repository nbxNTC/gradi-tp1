import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Equipment from '../models/Equipment';

export default {
    async create(request: Request, response: Response) {
        try{
            const {
                name,
            } = request.body;
        
            const EquipmentRepositorty = getRepository(Equipment);
        
            const equipment = EquipmentRepositorty.create({
                name
            })
        
            await EquipmentRepositorty.save(equipment);
    
            return response.status(201).json(equipment);
        } catch(error) {
            return response.status(400).json(error);
        }
    },

    async index(request: Request, response: Response) {
        try{
            const EquipmentRepository = getRepository(Equipment);

            const equipments = await EquipmentRepository.find();
    
            return response.status(200).json(equipments);
        } catch(error) {
            return response.status(400).json(error);
        }
    }
}