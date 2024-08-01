import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FindJobDto } from './dto/find-job.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ObjectId } from 'mongodb';


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
  @Post('insertOne')
  async insertOne(@Body() body, @Res() res) {
      try {
          const { collection, database, document } = body;
          // Cambiar a la base de datos especificada
          const db = this.connection.useDb(database);
          const result = await db.collection(collection).insertOne(document);
          // Enviar una respuesta JSON con el resultado de la inserción
          res.status(200).json(result);
      } catch (error) {
          // Enviar una respuesta de error si ocurre algún problema
          console.error('Error en la inserción:', error);
          res.status(500).json({ error: 'Error en la inserción de datos' });
      }
  }
  @Post('findOne')
  async findOne(@Body() findJobDto: FindJobDto, @Res() res) {
    const { collection, database, filter } = findJobDto;

    // Cambiar a la base de datos especificada
    const db = this.connection.useDb(database);

    try {
      // Asegurarse de que el _id sea un ObjectId si está presente
      if (filter._id) {
        filter._id = new ObjectId(filter._id);
      }

      // Acceder a la colección y realizar la consulta
      const document = await db.collection(collection).findOne(filter);
      if (document) {
        res.status(200).json(document);
      } else {
        res.status(404).json({ error: 'Documento no encontrado' });
      }
    } catch (err) {
      console.error('Error en la consulta:', err);
      res.status(500).json({ error: 'Error en la consulta de datos' });
    }
  }
  @Post('updateOne')
  async updateOne(@Body() body, @Res() res) {
    const { collection, database, filter, update } = body;
  
    const db = this.connection.useDb(database);
  
    try {
      // Asegurarse de que el _id sea un ObjectId si está presente
      if (filter._id) {
        filter._id = new ObjectId(filter._id);
      }
  
      // Realizar la actualización
      const result = await db.collection(collection).updateOne(filter, update);
      if (result.matchedCount > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: 'Documento no encontrado' });
      }
    } catch (err) {
      console.error('Error en la actualización:', err);
      res.status(500).json({ error: 'Error en la actualización de datos' });
    }
  }
  
  @Post('deleteOne')
  async deleteOne(@Body() body, @Res() res) {
    const { collection, database, filter } = body;
  
    const db = this.connection.useDb(database);
  
    try {
      // Asegúrate de que el _id sea un ObjectId si está presente
      if (filter._id) {
        filter._id = new ObjectId(filter._id);
      }
  
      // Realizar la eliminación
      const result = await db.collection(collection).deleteOne(filter);
      if (result.deletedCount > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: 'Documento no encontrado' });
      }
    } catch (err) {
      console.error('Error en la eliminación:', err);
      res.status(500).json({ error: 'Error en la eliminación de datos' });
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


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}
