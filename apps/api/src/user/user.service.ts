import { UserSerializer } from '@/serializer/user.serializer';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { SerializedUser } from '@repo/types/src/user';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private userSerializer: UserSerializer,
  ) {}

  async find(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<SerializedUser | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    if (!prismaUser) return null;

    return this.userSerializer.serialize(prismaUser);
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<SerializedUser[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const prismaUsers = await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });

    // TODO: Actual Error Handling...
    if (!prismaUsers) return [];

    return prismaUsers.map((prismaUser) =>
      this.userSerializer.serialize(prismaUser),
    );
  }

  async createUser(data: Prisma.UserCreateInput): Promise<SerializedUser> {
    const prismaUser = await this.prisma.user.create({
      data,
    });

    return this.userSerializer.serialize(prismaUser);
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<SerializedUser> {
    const { where, data } = params;
    const prismaUser = await this.prisma.user.update({
      data,
      where,
    });

    return this.userSerializer.serialize(prismaUser);
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<boolean> {
    await this.prisma.user.delete({
      where,
    });
    return true;
  }
}
