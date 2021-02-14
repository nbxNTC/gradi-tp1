import {Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

export default {
    async create(request: Request, response: Response) {
        const name = request.body.name;
    
        const UserRepository = getRepository(User);
    
        const user = UserRepository.create({
            name
        })
    
        await UserRepository.save(user);
        
        return response.status(201).json(user);
    }
}