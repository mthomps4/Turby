import { PrismaModule } from '@/prisma/prisma.module';
import { SerializerModule } from '@/serializers/serializers.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  imports: [PrismaModule, SerializerModule],
  controllers: [UserController],
  // If extra Biz logic needed beyond Prisma CRUD, uncomment this and create a file in this directory.
  // providers: [UserService],
  // exports: [UserService],
})
export class UserModule {}
