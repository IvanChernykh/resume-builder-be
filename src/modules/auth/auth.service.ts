import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import bcrypt from 'node_modules/bcryptjs';
import { Repository } from 'typeorm';

import { UsersService } from './../users/users.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { AuthResponse } from './interfaces/auth.response';
import { JwtPayload } from './interfaces/JwtPayload';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  private JWT_ACCESS_SECRET: string;
  private JWT_ACCESS_TTL: string;

  private JWT_REFRESH_SECRET: string;
  private JWT_REFRESH_TTL: string;

  constructor(
    @InjectRepository(UserEntity) private usersRepo: Repository<UserEntity>,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_SECRET =
      configService.getOrThrow<string>('JWT_ACCESS_SECRET');
    this.JWT_ACCESS_TTL = configService.getOrThrow<string>('JWT_ACCESS_TTL');

    this.JWT_REFRESH_SECRET =
      configService.getOrThrow<string>('JWT_REFRESH_SECRET');
    this.JWT_REFRESH_TTL = configService.getOrThrow<string>('JWT_REFRESH_TTL');
  }

  async generateTokens(userId: string): Promise<AuthResponse> {
    const accessToken = await this.jwtService.signAsync(
      { sub: userId },
      {
        secret: this.JWT_ACCESS_SECRET,
        expiresIn: this.JWT_ACCESS_TTL,
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      { sub: userId },
      {
        secret: this.JWT_REFRESH_SECRET,
        expiresIn: this.JWT_REFRESH_TTL,
      },
    );

    return { accessToken, refreshToken };
  }

  async register(dto: RegisterUserDto): Promise<AuthResponse> {
    const isExists = await this.usersService.findByEmail(dto.email);

    if (isExists) {
      throw new ConflictException('User already exists');
    }

    const user = this.usersRepo.create({
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    });

    await this.usersRepo.save(user);

    return await this.generateTokens(user.id);
  }

  async login(dto: LoginUserDto): Promise<AuthResponse> {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Email or password does not match');
    }

    const match = await bcrypt.compare(dto.password, user.password);

    if (!match) {
      throw new UnauthorizedException('Email or password does not match');
    }

    return await this.generateTokens(user.id);
  }

  logout(res: Response): boolean {
    res.clearCookie('refreshToken');

    return true;
  }

  async refreshToken(req: Request) {
    const token = req.cookies['refreshToken'] as string;

    if (!token) {
      throw new UnauthorizedException();
    }

    let payload: JwtPayload;

    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: this.JWT_REFRESH_SECRET,
      });
    } catch {
      throw new UnauthorizedException();
    }

    return await this.generateTokens(payload.sub);
  }
}
