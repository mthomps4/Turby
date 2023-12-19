import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('User')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Get('fetchAll')
  async fetchAll() {
    this.logger.log('Fetching all users');
    return await this.userService.findAll({});
  }

  @Get('findById/:id')
  async findById(@Param('id') id: string) {
    this.logger.log(`Fetching user by ID ${id}`);
    const user = await this.userService.find({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
