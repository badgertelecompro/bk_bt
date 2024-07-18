import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
export declare class JobsService {
    [x: string]: any;
    insertOne(collection: string, database: string, document: any): Promise<any>;
    create(createJobDto: CreateJobDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateJobDto: UpdateJobDto): string;
    remove(id: number): string;
}
