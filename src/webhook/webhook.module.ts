import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebHookController } from './webhook.controller';
import { WebHookService } from './webhook.service';
import { WebHookSchema } from './webhook.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'WebHook', schema: WebHookSchema }]),
  ],
  controllers: [WebHookController],
  providers: [WebHookService],
})
export class WebHookModule {}
