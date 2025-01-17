import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FindJobDto } from './dto/find-job.dto';
import { Connection } from 'mongoose';
export declare class JobsController {
    private readonly jobsService;
    private readonly connection;
    constructor(jobsService: JobsService, connection: Connection);
    find(findJobDto: FindJobDto): Promise<import("mongodb").WithId<import("mongoose").AnyObject>[]>;
    insertOne(body: any, res: any): Promise<void>;
    findOne(findJobDto: FindJobDto, res: any): Promise<void>;
    updateOne(body: any, res: any): Promise<void>;
    deleteOne(body: any, res: any): Promise<void>;
    create(createJobDto: CreateJobDto): string;
    findAll(): string;
    update(id: string, updateJobDto: UpdateJobDto): string;
    remove(id: string): string;
}
