import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SignInAuthDto } from './dto/signin-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: CreateAuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  async signin(@Body() dto: SignInAuthDto) {
    const user = await this.authService.signin(dto);

    return this.authService.accessToken(user);
  }
}
