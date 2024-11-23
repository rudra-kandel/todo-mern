export interface ICreateTask {
    title: string;
    description: string;
    userId:string;
}

export interface IUpdateTask extends ICreateTask {
}