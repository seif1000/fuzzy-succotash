import fs from "fs";
import bcrypt from "bcrypt";

export class User {
  id!: number;
  email: string;
  first_name: string | undefined;
  last_name: string | undefined;
  birthday: string | undefined;
  password: string | undefined;
  age: number | undefined;
  full_name: string | undefined;

  constructor(
    email: string,
    first_name: string,
    last_name: string,
    birthday: string,
    password: string
  ) {
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.birthday = birthday;
    this.password = password;
  }

  static async createUser(
    email: string,
    first_name: string,
    last_name: string,
    birthday: string,
    password: string
  ): Promise<User> {
    try {
      const data = await fs.promises.readFile("models/users.json", "utf8");
      const users = JSON.parse(data);
      const isEmailExist = users.users.find(
        (user: User) => user.email === email
      );
      if (isEmailExist) {
        throw new Error("Email already exists");
      } else {
        const hashPassword = await bcrypt.hash(password, 10);

        const user = new User(
          email,
          first_name,
          last_name,
          birthday,
          hashPassword
        );
        user.id = users.users.length + 1;

        users.users.push(user);
        await fs.promises.writeFile("models/users.json", JSON.stringify(users));
        user.password = undefined;
        return user;
      }
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }
  static async getAllUsers(): Promise<User[]> {
    try {
      const data = await fs.promises.readFile("models/users.json", "utf8");
      let users = JSON.parse(data);
      users = users.users.map((user: User) => {
        user.password = undefined;
        user.age = user.birthday
          ? new Date().getFullYear() - new Date(user.birthday).getFullYear()
          : 0;
        user.full_name = `${user.first_name} ${user.last_name}`;
        user.birthday = undefined;

        user.first_name = undefined;
        user.last_name = undefined;
        return user;
      });

      return users;
    } catch (error) {
      throw new Error(`Error getting users: ${error}`);
    }
  }
  /// get user by id than update it
  static async updateUser(
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    birthday: string
  ): Promise<User> {
    try {
      const data = await fs.promises.readFile("models/users.json", "utf8");
      const users = JSON.parse(data);
      const userIndex = users.users.findIndex((user: User) => user.id === id);
      const isEmailExist = users.users.find(
        (user: User) => user.email === email
      );

      if (isEmailExist && isEmailExist.id !== id) {
        throw new Error("Email already exists");
      }
      if (userIndex === -1) {
        throw new Error("User not found");
      } else {
        const user = new User(
          email,
          first_name,
          last_name,
          birthday,
          users.users[userIndex].password
        );
        user.id = id;

        users.users[userIndex] = user;
        await fs.promises.writeFile("models/users.json", JSON.stringify(users));
        user.password = undefined;
        user.age = user.birthday
          ? new Date().getFullYear() - new Date(user.birthday).getFullYear()
          : 0;
        user.full_name = `${user.first_name} ${user.last_name}`;
        user.birthday = undefined;

        user.first_name = undefined;
        user.last_name = undefined;
        return user;
      }
    } catch (error) {
      throw new Error(`Error updating user: ${error}`);
    }
  }
  static async getUserById(id: number): Promise<User> {
    try {
      const data = await fs.promises.readFile("models/users.json", "utf8");
      const users = JSON.parse(data);
      const userIndex = users.users.findIndex((user: User) => user.id === id);
      if (userIndex === -1) {
        throw new Error("User not found");
      } else {
        const user = users.users[userIndex];
        user.password = undefined;
        user.age = user.birthday
          ? new Date().getFullYear() - new Date(user.birthday).getFullYear()
          : 0;
        user.full_name = `${user.first_name} ${user.last_name}`;
        user.birthday = undefined;

        user.first_name = undefined;
        user.last_name = undefined;
        return user;
      }
    } catch (error) {
      throw new Error(`Error getting user: ${error}`);
    }
  }
  static async deleteUser(id: number): Promise<User> {
    try {
      const data = await fs.promises.readFile("models/users.json", "utf8");
      const users = JSON.parse(data);
      const userIndex = users.users.findIndex((user: User) => user.id === id);
      if (userIndex === -1) {
        throw new Error("User not found");
      } else {
        const user = users.users[userIndex];
        users.users.splice(userIndex, 1);
        await fs.promises.writeFile("models/users.json", JSON.stringify(users));
        user.password = undefined;
        user.age = user.birthday
          ? new Date().getFullYear() - new Date(user.birthday).getFullYear()
          : 0;
        user.full_name = `${user.first_name} ${user.last_name}`;
        user.birthday = undefined;

        user.first_name = undefined;
        user.last_name = undefined;
        return user;
      }
    } catch (error) {
      throw new Error(`Error deleting user: ${error}`);
    }
  }
}
