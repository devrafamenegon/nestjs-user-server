import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  
  @Get(':username')
  findByName(@Param('username') username: string): User {
    const findedUser = this.userService.findByUsername(username);
    return findedUser;
  }
  
  @Post()
  create(@Body() user: User, @Res() res): void  {
    const userCreated = this.userService.create(user);
    res.status(HttpStatus.CREATED).location(`/users/${user.username}`).json(userCreated);
  }
}