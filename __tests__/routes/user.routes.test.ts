import request from "supertest";
import fs from "fs";

import app from "../../app";
import { User } from "../../models/User";

describe("User routes", () => {
  test("Get all user ", async () => {
    const res = await request(app).get("/api/v1/users");
    expect(res.status).toBe(200);

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

    expect(res.body).toEqual(users);
  });
  test("Get user by id", async () => {
    const res = await request(app).get("/api/v1/users/1");
    expect(res.status).toBe(200);

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

    expect(res.body).toEqual(users[0]);
  });

  test("Create user", async () => {
    const data = await fs.promises.readFile("models/users.json", "utf8");
    let users = JSON.parse(data);
    const res = await request(app)
      .post("/api/v1/users")
      .send({
        email: "hala@test.com",
        first_name: "test",
        last_name: "test",
        birthday: "1999-07-19",
        password: "11234567",
      } as User);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      email: "hala@test.com",
      first_name: "test",
      last_name: "test",
      birthday: "1999-07-19",
      id: users.users.length + 1,
    });
  });
});
