import { SerializerModule } from '@/serializers/serializers.module';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService, SerializerModule],
  exports: [PrismaService],
})
export class PrismaModule {}
