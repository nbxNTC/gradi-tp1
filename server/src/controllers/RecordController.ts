import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Record from '../models/Record';

export default {
    async create(request: Request, response: Response) {
        try {
            const {
                title,
                observation,
                user_id
            } = request.body;
        
            const RecordRepository = getRepository(Record);
        
            const record = RecordRepository.create({
                title,
                observation,
                user_id
            })
        
            await RecordRepository.save(record);
    
            return response.status(201).json(record);
        } catch(error) { 
            return response.status(400).json(error);
        }
    },
}