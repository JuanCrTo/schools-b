import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ISimpleUser, IUser } from 'src/user/interfaces/user.interface';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('users')
  async getUsers(): Promise<ISimpleUser[]> {
    return this.chatService.getUsers();
  }
}
