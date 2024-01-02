import { PrismaModule } from '@/prisma/prisma.module';
import { SerializerModule } from '@/serializer/serializer.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule, SerializerModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
