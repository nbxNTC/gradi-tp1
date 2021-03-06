import {Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

export default {
    async create(request: Request, response: Response) {
        try {

        } catch(error) { 
            return response.status(400).json(error);
        }
        const {
            name,
            birth_date,
            weight,
            height,
            gender,
            observation,
            role
        } = request.body;
    
        const UserRepository = getRepository(User);
    
        const user = UserRepository.create({
            name,
            birth_date,
            weight,
            height,
            gender,
            observation,
            role
        })
    
        await UserRepository.save(user);

        return response.status(201).json(user);
    },

    async index(request: Request, response: Response) {
        try {
        const userRepository = getRepository(User);

        const users = await userRepository.find();

        return response.status(200).json(users);

        } catch(error) { 
            return response.status(400).json(error);
        }
    },

    async show(request: Request, response: Response) {
        try {

        const { id } = request.params;
        const userRepository = getRepository(User);

        const user = await userRepository.findOneOrFail(id);

        return response.status(200).json(user);

        } catch(error) { 
            return response.status(400).json(error);
        }
    },

    async records(request: Request, response: Response) {
        try {
        const { id } = request.params;
        const userRepository = getRepository(User);

        const user = await userRepository.find({
            relations: ['records'],
            where: {id: id},
        });

        /*  GroupBy Weekday     */
        //let group = user[0].records[0].exercises.reduce((r, a) => { console.log("a", a); console.log('r', r); r[a.day] = [...r[a.day] || [], a]; return r;}, {});console.log("group", group);
        
        /*  GroupBy Schedule  */
        //let group = user[0].records[0].exercises.reduce((r, a) => { console.log("a", a); console.log('r', r); r[a.schedule] = [...r[a.schedule] || [], a]; return r;}, {});console.log("group", group);

        return response.status(200).json(user);
        
        } catch(error) { 
            return response.status(400).json(error);
        }
    },
}