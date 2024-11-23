import { ICreateTask } from '@interfaces/task';
import Task from '@models/Task';
import User from '@models/User';
import httpContext from 'express-http-context';

export const createTask = async (createTaskDto: ICreateTask) => {
     const {userId} = httpContext.get('user');
const createTask =  await Task.create({...createTaskDto,userId});
    return createTask;
};

export const getAll = async (page:number = 1 , limit:number = 10 ) => {
    console.log(page,limit)
    const offset = (page - 1) * limit;
    const {userId} = httpContext.get('user');
     const { count, rows } = await Task.findAndCountAll({
        where: { userId },
        limit: limit,
        offset,
        order: [['createdAt', 'DESC']],
    });

    return {
        rows,
        count,
    };
}

export const updateTask = async (id:string,updateTaskDto: ICreateTask) => {
     const {userId} = httpContext.get('user');
     const getTask = await Task.findOne({
        where:{id,userId}
     })
     if(!getTask){
        throw new Error ("Task not found")
     }
 await Task.update({...updateTaskDto},{where:{
    id,userId
}});
     const createTask = await Task.findOne({
        where:{id,userId}
     })
    return createTask;
};

export const deleteTask = async (id:string) => {
     const {userId} = httpContext.get('user');
     const getTask = await Task.findOne({
        where:{id,userId}
     })
     if(!getTask){
        throw new Error ("Task not found")
     }
 await Task.destroy({where:{
    id,userId
}});
    return true;
};
