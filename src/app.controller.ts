import { Controller, Get, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
