import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsUserAlreadyExist } from "./IsUserAlreadyExist.validator";

export class User {
  id: number;

  @Expose({name: "username"})
  @IsUserAlreadyExist({message: "Username is already taken",})
  @IsNotEmpty({message: "Username is required"})
  @IsString({message: "Username must be a string"})
  username: string;

  @Expose({name: "email"})
  @IsEmail({}, {message: 'Email is not valid',})
  email: string;

  @Expose({name: "password",})
  @Exclude({toPlainOnly: true,})
  @IsNotEmpty({message: "Password is required",})
  password: string;

  @Expose({name: "fullName"})
  @IsNotEmpty({message: "Please enter your full name",})
  @IsString({message: "fullName must be a string"})
  fullName: string; 
  
  @Expose({name: "entryDate"})
  entryDate: Date;
}