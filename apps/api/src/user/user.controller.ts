import { UserSerializer } from '@/serializers/user.serializer';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserFilters } from '@repo/types/src/user';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('User')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService,
    private readonly userSerializer: UserSerializer,
  ) {}

  @Get('fetchAll')
  async fetchAll(@Query() filters: UserFilters | undefined) {
    this.logger.log('Fetching all users');

    const foundUsers = await this.userService.findAll(filters);

    if (!foundUsers) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }

    return foundUsers.map((user) => this.userSerializer.serialize(user));
  }

  @Get('findById/:id')
  async findById(@Param('id') id: string) {
    this.logger.log(`Fetching user by ID ${id}`);
    const user = await this.userService.find({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.userSerializer.serialize(user);
  }
}
