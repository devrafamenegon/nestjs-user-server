import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UserService } from "./user.service";

@Injectable()
@ValidatorConstraint()
export class IsUserAlreadyExistContraint implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  validate(username: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    return !!!this.userService.findByUsername(username);
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistContraint,
    });
  };
}