import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FindJobDto } from './dto/find-job.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller('api/action')
export class JobsController {
  constructor(private readonly jobsService: JobsService,@InjectConnection() private readonly connection: Connection) {}
  @Post('find')
  async find(@Body() findJobDto: FindJobDto) {
    const { collection, database, filter } = findJobDto;

    // Cambiar a la base de datos especificada
    const db = this.connection.useDb(database);

    try {

      // Acceder a la colección y realizar la consulta
      const documents = await db.collection(collection).find(filter).toArray();
      return documents;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  
  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}
