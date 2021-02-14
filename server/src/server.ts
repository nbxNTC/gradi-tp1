import express from 'express';
import { getRepository } from 'typeorm';
import User from './models/User';


import './database/connection';

const app = express();

app.use(express.json());

app.post('/users', async (request, response) => {
    const name = request.body.name;
    
    const UserRepository = getRepository(User);

    const user = UserRepository.create({
        name
    })

    await UserRepository.save(user);

    return response.json(user);
})

app.get('/users', (request,  response) => {
    return response.status(201).json({ message: 'teste'});
})

app.listen(3333)