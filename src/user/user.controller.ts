import { Body, Controller, Get, Param, Post } from "@nestjs/common";
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
  create(@Body() user: User): User  {
    throw new Error("Method not implemented.");
    const userCreated = this.userService.create(user);
    return userCreated;
  }
}