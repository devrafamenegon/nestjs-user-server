import { Module } from "@nestjs/common";
import { IsUserAlreadyExistContraint } from "./IsUserAlreadyExist.validator";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  providers: [UserService, IsUserAlreadyExistContraint],
})
export class UserModule {}