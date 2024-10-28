import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/models/user';
import { UsersService } from 'src/modules/users/service/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
