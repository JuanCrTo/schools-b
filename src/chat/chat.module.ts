import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose'; // Asegúrate de importar MongooseModule
import { School, SchoolSchema } from 'src/school/model/school.schema'; // Ajusta la ruta según sea necesario
import { Student, StudentSchema } from 'src/student/model/student.schema'; // Ajusta la ruta según sea necesario
import { ChatController } from './chat.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: School.name, schema: SchoolSchema }]),
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  controllers: [ChatController], // Add this line
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
