import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      username: 'testuser',
      password: 'testpass',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
  async findById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}
