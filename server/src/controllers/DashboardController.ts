import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Record from '../models/Record';
import Equipment from '../models/Equipment';
import Exercise from '../models/Exercise';
import User from '../models/User';

export default {

    async index(request: Request, response: Response) {
        try {

            const ExerciseRepository = getRepository(Exercise);

            const exercises = await ExerciseRepository.find({
                relations: ['equipment']
            })

            let exercisesByDay: number[] = [];

            const exercisesOnMon = exercises.filter((exercises) => {
                return exercises.day === 'MON'
            }).length

            const exercisesOnTue = exercises.filter((exercises) => {
                return exercises.day === 'TUE'
            }).length

            const exercisesOnWed = exercises.filter((exercises) => {
                return exercises.day === 'WED'
            }).length

            const exercisesOnThu = exercises.filter((exercises) => {
                return exercises.day === 'THU'
            }).length

            const exercisesOnTry = exercises.filter((exercises) => {
                return exercises.day === 'FRI'
            }).length

            exercisesByDay[0] = exercisesOnMon
            exercisesByDay[1] = exercisesOnTue
            exercisesByDay[2] = exercisesOnWed
            exercisesByDay[3] = exercisesOnThu
            exercisesByDay[4] = exercisesOnTry

            let exercisesBySchedule: number[] = [];

            const exercisesInMorning = exercises.filter((exercises) => {
                return exercises.schedule === 'morning'
            }).length

            const exercisesInAfternoon = exercises.filter((exercises) => {
                return exercises.schedule === 'afternoon'
            }).length

            const exercisesAtNight = exercises.filter((exercises) => {
                return exercises.schedule === 'night'
            }).length

            exercisesBySchedule[0] = exercisesInMorning
            exercisesBySchedule[1] = exercisesInAfternoon
            exercisesBySchedule[2] = exercisesAtNight

            let equipments = exercises.map(function(item, key){
                return item.equipment.name;
            })
            
            const equipmentUsage = equipments.reduce((total, value) => {
                   total[value] = ((total[value] || 0) + 1 / equipments.length);
                   return total;
            }, {});

            
            let exercisesPercByDay: number[] = [];

            exercisesPercByDay[0] = exercisesOnMon / exercises.length
            exercisesPercByDay[1] = exercisesOnTue / exercises.length
            exercisesPercByDay[2] = exercisesOnWed / exercises.length
            exercisesPercByDay[3] = exercisesOnThu / exercises.length
            exercisesPercByDay[4] = exercisesOnTry / exercises.length

            
            let exercisesPercBySchedule: number[] = [];

            exercisesPercBySchedule[0] = exercisesInMorning / exercises.length
            exercisesPercBySchedule[1] = exercisesInAfternoon / exercises.length
            exercisesPercBySchedule[2] = exercisesAtNight / exercises.length

            const UserRepository = getRepository(User);

            const users = await UserRepository.find();

            var men: number = 0;
            var women: number = 0;

            let genders = users.map(function(item, key){
                if(item.gender){
                return men++
                } 
                return women++
            })

            const genderStats = {
                'men': men,
                'women': women
            }

            let average = (array) => array.reduce((a, b) => a + b) / array.length;

            average(users.map((user) => user.height));
            const avgHeight = average(users.map((user) => user.height));

            average(users.map((user) => user.weight));
            const avgWeigth = average(users.map((user) => user.weight));

            return response.status(200).json({
                exercisesByDay,
                exercisesBySchedule,
                equipmentUsage,
                exercisesPercByDay,
                exercisesPercBySchedule,
                genderStats,
                avgHeight,
                avgWeigth
            })

        } catch(error) { 
            return response.status(400).json(error);
        }
    },
}