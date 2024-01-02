import { Module } from '@nestjs/common';
import { UserSerializer } from './user.serializer';

@Module({
  imports: [],
  providers: [UserSerializer],
  exports: [UserSerializer],
})
export class SerializerModule {}
