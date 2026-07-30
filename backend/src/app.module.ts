import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';
import { LinkModule } from './module/user/user.module';
import { UserModule } from './module/link/links.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forRoot(process.env.MONGO_URL as string),
    LinkModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
