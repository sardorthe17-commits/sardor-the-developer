import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';
import { LinkModule } from './module/link/links.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forRoot(process.env.MONGO_URL as string),
    LinkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
