import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Exercise from '../models/Exercise';

export default {
    async create(request: Request, response: Response) {
        try {
            const {
                title,
                observation,
                series,
                repetitions,
                rest,
                day,
                schedule,
                equipment_id,
                record_id
            } = request.body;
        
            const ExerciseRepository = getRepository(Exercise);
        
            const exercise = ExerciseRepository.create({
                title,
                observation,
                series,
                repetitions,
                rest,
                day,
                schedule,
                equipment_id,
                record_id
            })
        
            await ExerciseRepository.save(exercise);
    
            return response.status(201).json(exercise);
        } catch(error) { 
            return response.status(400).json(error);
        }
    },

    async index(request: Request, response: Response) {
        try {
            const ExerciseRepository = getRepository(Exercise);

            const exercises = await ExerciseRepository.find({
                relations: ['equipment']
            });
            return response.status(200).json(exercises);
        } catch(error) { 
            return response.status(400).json(error);
        }
    },

    async getExercisesByRecord(request: Request, response: Response) {
        try {
            const ExerciseRepository = getRepository(Exercise);

            const exercises = await ExerciseRepository.find({
                relations: ['equipment']
            });
            return response.status(200).json(exercises);
        } catch(error) { 
            return response.status(400).json(error);
        }
    }
}