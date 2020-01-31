import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
let dbconfg = 'mongodb://test:!QAZ%40wsx@127.0.0.1:27017/test';
if (process.env.NODE_ENV === 'production') {
  dbconfg = 'mongodb://stone:!QAZ%40wsx@127.0.0.1:27017/stonebook';
}
@Module({
  imports: [
    MongooseModule.forRoot(dbconfg, {
      useCreateIndex: true,
      useNewUrlParser: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
