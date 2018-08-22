import { 
  Controller,
  Post, 
  Get,
  Put,
  Delete,
  Param,
  Req, 
  UseGuards, 
  UploadedFile, 
  UseInterceptors,
  FileInterceptor } from '@nestjs/common';

import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { IToken } from '../auth/interfaces/token.interface';

// Guards
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

import { MulterConfig } from '../../config/multer';

@Controller('users')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  //  Get my user information
  @Get('me')
  @Roles('user', 'admin')
  async me(@Req() req) {
  	return await this.userService.me(req.user);
  }

  @Roles('user', 'admin')
  @Put('upload')
  @UseInterceptors(FileInterceptor('file', MulterConfig))
  async uploadFile(@UploadedFile() file, @Req() req) {
    const user = req.user;
    return await this.userService.updateProfileImage(user, file);
  }

  //  JUST ADMIN - SUPER ADMIN METHODS
  //  Get All users (Admin)
  @Get()
  @Roles('admin', 'superadmin')
  async getUsers(@Req() req) {
    let query = req.query;
    return await this.userService.getUsers(query);
  }

  @Delete(':id')
  @Roles('admin', 'superadmin')
  async deleteUser(@Req() req) {
    const user = req.model;
    return await this.userService.deleteUser(user);
  }
}