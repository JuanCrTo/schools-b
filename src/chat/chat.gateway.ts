import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private activeUsers: { [socketId: string]: string } = {};

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
  }

  handleDisconnect(client: Socket) {
    const userId = this.activeUsers[client.id];
    delete this.activeUsers[client.id];
    this.server.emit('userDisconnected', userId);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: { userId: string; message: string }) {
    const { userId, message } = payload;
    console.log(`Message from user ${userId}: ${message}`);
    this.server.emit('receiveMessage', { userId, message });
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(client: Socket, userId: string) {
    this.activeUsers[client.id] = userId;
    console.log(`User ${userId} joined the chat`);
    this.server.emit('userJoined', userId);
  }

  @SubscribeMessage('getUsers')
  async handleGetUsers(client: Socket) {
    const users = await this.chatService.getUsers();
    console.log("Sending users to client:", users);
    client.emit('usersReceived', users); // Make sure this matches the frontend
  }
}
