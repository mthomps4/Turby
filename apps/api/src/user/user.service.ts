import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserFilters } from '@repo/types/src/user';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Note: Do not use 'select' with serializers.
  async find(params: Omit<Prisma.UserFindUniqueArgs, 'select'>) {
    return this.prisma.user.findUnique({
      ...params,
    });
  }

  async findAll(filters: UserFilters | undefined) {
    return this.prisma.user.findMany({
      skip: filters?.paginationFilters?.skip,
      take: filters?.paginationFilters?.take,
      where: {
        firstName: filters?.firstName,
        lastName: filters?.lastName,
        email: filters?.email,
      },
    });
  }

  async createUser(params: Omit<Prisma.UserCreateArgs, 'select'>) {
    return this.prisma.user.create({
      ...params,
    });
  }

  async updateUser(params: Omit<Prisma.UserUpdateArgs, 'select'>) {
    return this.prisma.user.update({
      ...params,
    });
  }

  async deleteUser(
    params: Omit<Prisma.UserFindUniqueArgs, 'select'>,
  ): Promise<boolean> {
    await this.prisma.user.delete({
      ...params,
    });
    return true;
  }
}
