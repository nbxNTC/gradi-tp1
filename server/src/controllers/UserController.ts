import {Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

export default {
    async create(request: Request, response: Response) {
        const {
            name,
            role
        } = request.body;
    
        const UserRepository = getRepository(User);
    
        const user = UserRepository.create({
            name,
            role
        })
    
        await UserRepository.save(user);

        return response.status(201).json(user);
    },

    async index(request: Request, response: Response) {
        const userRepository = getRepository(User);

        const users = await userRepository.find();

        return response.status(200).json(users);
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const userRepository = getRepository(User);

        const user = await userRepository.findOneOrFail(id);

        return response.status(200).json(user);
    }
}