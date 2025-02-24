import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Pool } from 'pg';
// eslint-disable-next-line import/extensions
import { DatabaseConfig } from '../config/database.config';

@Injectable()
export class AuthService {
  private pool: Pool;

  constructor(private jwtService: JwtService) {
    this.pool = new Pool(DatabaseConfig);
  }

  async register(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username`;
    const result = await this.pool.query(query, [username, hashedPassword]);
    return result.rows[0];
  }

  async validateUser(username: string, password: string) {
    const query = `SELECT * FROM users WHERE username = $1`;
    const result = await this.pool.query(query, [username]);
    const user = result.rows[0];

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }

  async login(user: any) {
    const payload = { userId: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
