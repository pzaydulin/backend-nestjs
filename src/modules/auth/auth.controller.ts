import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './service/auth.service';
import { Repository } from 'typeorm';
import dataSource from 'ormconfig.sample';
import { User } from 'src/models/user.entity';

@Controller('auth')
export class AuthController {
  private userRepository: Repository<User>;

  constructor(private authService: AuthService) {
    this.userRepository = dataSource.getRepository(User);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  async refresh(@Request() req) {
    const user = await this.userRepository.findOneBy({ id: req.user.sub });
    return this.authService.login(user);
  }
}
