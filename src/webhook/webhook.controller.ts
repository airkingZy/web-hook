import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  HttpCode,
  Header,
  Res,
  Req,
  Headers,
} from '@nestjs/common';
import { WebHookService } from './webhook.service';
import { CreateWebHookDto } from './create-webhook.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import multer = require('multer');
@Controller('/api/webhook')
export class WebHookController {
  constructor(private readonly webhookService: WebHookService) {}
  @Get('findall')
  async searchList(@Param('name') name: string): Promise<object> {
    return this.webhookService.findAll();
  }
  @Post('created')
  async created(@Body() createWebHookDto: CreateWebHookDto): Promise<object> {
    return this.webhookService.create(createWebHookDto);
  }
  @Post('upload')
  @UseInterceptors(
    FileInterceptor(
      'file',
      // , {
      //   storage: multer.diskStorage({
      //     destination: (req, file, cb) => {
      //       cb(null, path.join(__dirname, '../../src/file/sh/'));
      //     },
      //     filename: (req, file, cb) => {
      //       cb(null, file.originalname);
      //     },
      //   }
      // ),
      // }
    ),
  ) // file对应HTML表单的name属性
  async uploadFile(@UploadedFile() file) {
    // console.log(file);
    return this.webhookService.uploads(file);
  }
  @Post('getpush')
  @HttpCode(200)
  // @Header('Cache-Control', 'defineHeader')
  async getpush(@Headers() headers, @Body() body) {
    // console.log(headers);
    // return headers;
    return this.webhookService.getGitPush(headers, body);
  }
}
