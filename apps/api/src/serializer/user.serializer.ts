import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { SerializedUser } from '@repo/types/src/user';

export type UserWithRelationships = User & {
  // Optional relationships here
  // posts: Post[] | undefined;
};

@Injectable()
export class UserSerializer {
  serialize(prismaUser: UserWithRelationships): SerializedUser {
    return {
      firstName: prismaUser.firstName,
      lastName: prismaUser.lastName,
      email: prismaUser.email,
    };
  }
}
