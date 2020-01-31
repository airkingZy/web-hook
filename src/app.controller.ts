import { Controller, Get, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
  @Get('search/:name?')
  async searchList(@Param('name') name: string): Promise<Object> {
    return this.appService.searchList(name);
  }
  @Get('booklist/:url1?/:url2?')
  async getBookDetail(
    @Param('url1') url1: string,
    @Param('url2') url2: string,
  ): Promise<Object> {
    const url = `${url1}/${url2}`;
    return this.appService.getBookDetail(url);
  }
}
