import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { dataSource } from 'ormconfig';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  private userRepository: Repository<User>

  constructor(
    private jwtService: JwtService,
  ) {
    this.userRepository = dataSource.getRepository(User);
  }

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userRepository.findOne({where: {username}});

    if (user && await bcrypt.compare(pass, user.password_hash)) {
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
