import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpStatus,
  HttpCode,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IRequest } from '../request-user.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ParamUserDto } from './dto/param-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ViewUserDto } from './dto/view-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  getAll() {
    const users = this.userService.getAll();
    return users.map((user) => new ViewUserDto(user));
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  getOne(@Param() param: ParamUserDto) {
    const user = this.userService.getOne(param.id);
    return new ViewUserDto(user);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  update(@Req() req: IRequest, @Body() updateUserDto: UpdateUserDto) {
    this.userService.update(req.user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param() param: ParamUserDto) {
    this.userService.remove(param.id);
  }
}
