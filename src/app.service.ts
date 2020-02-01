import { Injectable } from '@nestjs/common';
import axios from 'axios';
import cheerio from 'cheerio';
@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const text = 'hello world';
    return text;
  }
}
