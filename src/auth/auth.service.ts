import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
    private jwtService: JwtService,
  ) {}

  async signup(dto: CreateAuthDto): Promise<AuthEntity> {
    const userExist = await this.findUserByEmail(dto.email);

    if (userExist) throw new BadRequestException('User exist with this email');

    dto.password = await bcrypt.hash(dto.password, 10);
    const user = this.authRepository.create(dto);
    return await this.authRepository.save(user);
  }

  async signin(dto: SignInAuthDto) {
    const userExist = await this.findUserByEmail(dto.email);

    if (!userExist) throw new BadRequestException('Invalid creditials');

    const passMatch = await bcrypt.compare(dto.password, userExist.password);

    if (!passMatch) {
      throw new BadRequestException('Invalid creditials');
    }

    return userExist;
  }

  accessToken(user: AuthEntity) {
    const payload = { userId: user.id, email: user.email };
    return { 'access-token': this.jwtService.sign(payload) };
  }

  async findUserByEmail(email: string) {
    return await this.authRepository.findOneBy({ email });
  }
}
