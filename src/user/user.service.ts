import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  private users = [
    {
      id: 1, 
      username: "john", 
      email: "john@gmail.com", 
      password: "123456", 
      fullName: "John Doe",
      entryDate: new Date()
    },
  ];

  public create(user: User): User {
    this.users.push(user);
    return user;
  }

  public findByUsername(username: string): User {
    return this.users.find(user => user.username === username);
  }
}