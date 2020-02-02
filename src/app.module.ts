import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WebHookModule } from './webhook/webhook.module';
let dbconfg = 'mongodb://zy:!QAZ%40wsx@127.0.0.1:27017/webhook';
if (process.env.NODE_ENV === 'production') {
  dbconfg = 'mongodb://zy:!QAZ%40wsx@127.0.0.1:27017/webhook';
}
@Module({
  imports: [
    MongooseModule.forRoot(dbconfg, {
      useCreateIndex: true,
      useNewUrlParser: true,
    }),
    WebHookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
