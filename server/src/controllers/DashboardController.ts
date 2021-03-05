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

            console.log(equipmentUsage); 

            return response.status(200).json({
                exercisesByDay,
                exercisesBySchedule,
                equipmentUsage
            })

        } catch(error) { 
            return response.status(400).json(error);
        }
    },
}