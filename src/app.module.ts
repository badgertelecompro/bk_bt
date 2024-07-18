import { Module } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import {MongooseModule} from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://badgertelecompro:Fm3z6fI5O6Vj3vha@cluster0.jpuqnku.mongodb.net/<database>?retryWrites=true&w=majority'),
    JobsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
