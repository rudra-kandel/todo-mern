import config from '@config/env.config';
import { ICreateTask, IUpdateTask } from '@interfaces/task';
import { createTask ,deleteTask,getAll, updateTask} from '@services/task.service';
import { sendSuccessResponse } from '@utils/response';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
const { appUrl } = config

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dto: ICreateTask = req.body;
         const response = await createTask(dto);

        return sendSuccessResponse(res, httpStatus.CREATED, "Task created successfully",response)
    } catch (error) {
        next(error)
    }
};

export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
             const page = Number(req.query.page) || 1; // Default to 1 if not provided
        const limit = Number(req.query.limit) || 100;
         const {count, rows} = await getAll(page,limit);
        return sendSuccessResponse(res, httpStatus.CREATED, "Sucessful", rows, { count })
    } catch (error) {
        next(error)
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
           const taskDto:IUpdateTask = req.body;
           const response = await updateTask(req.params.id,taskDto);
           console.log(response)
           return sendSuccessResponse(res,httpStatus.CREATED,"Sucessful",response)
    } catch (error) {
        next(error)
    }
};

export const taskDelete = async (req: Request, res: Response, next: NextFunction) => {
    try {
          await deleteTask(req.params.id);
           return sendSuccessResponse(res,httpStatus.CREATED,"Deleted Sucessfully")
    } catch (error) {
        next(error)
    }
};




