import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post} from "@nestjs/common";
import { NestResponse } from "../core/http/nest-response";
import { NestResponseBuilder } from "../core/http/nest-response-builder";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  
  @Get(':username')
  findByName(@Param('username') username: string): User {
    const findedUser = this.userService.findByUsername(username);
    if(!findedUser) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `User ${username} not found`,
      })
    }
    return findedUser;
  }
  
  @Post()
  create(@Body() user: User): NestResponse {
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeader({'Location': `/users/${user.username}`})
      .withBody(user)
      .build();
  }
}