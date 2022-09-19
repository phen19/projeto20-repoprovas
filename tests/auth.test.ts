import { app } from "../src/app";
import supertest from "supertest";
import { prisma } from "../src/database/database";
import {
  emptyFields,
  emptyFieldsSignIn,
  invalidJoiValidation,
  invalidJoiValidationSignIn,
  validData,
} from "./factories/authFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
});

describe("POST /signup -> create user", () => {
  it("returns 201 for created", async () => {
    const body = await validData();
    const result = await supertest(app).post("/signup").send(body);
    expect(result.status).toEqual(201);
    const userCreated = await prisma.users.findFirst({
      where: { email: body.email },
    });

    expect(userCreated).not.toBeNull();
  });

  it("returns 409 for conflict", async () => {
    const body = await validData();
    await supertest(app).post("/signup").send(body);
    const result = await supertest(app).post("/signup").send(body);

    expect(result.status).toEqual(409);
  });

  it("returns 422 for empty fields", async () => {
    const body = await emptyFields();
    const result = await supertest(app).post("/signup").send(body);
    expect(result.status).toEqual(422);
  });

  it("returns 422 for no body sent", async () => {
    const result = await supertest(app).post("/signup").send({});
    expect(result.status).toEqual(422);
  });

  it("returns 422 for invalid fields", async () => {
    const body = invalidJoiValidation();
    const result = await supertest(app).post("/signup").send(body);
    expect(result.status).toEqual(422);
  });
});

describe("POST /signin -> user login", () => {
  it("returns 200 for success login", async () => {
    const create = await validData();
    await supertest(app).post("/signup").send(create);
    const login = { email: create.email, password: create.password };
    const result = await supertest(app).post("/signin").send(login);
    expect(typeof result.body.token).toBe("string");
    expect(result.status).toEqual(200);
  });

  it("returns 401 for incorrect password", async () => {
    const create = await validData();
    await supertest(app).post("/signup").send(create);
    const login = { email: create.email, password: "1" + create.password };
    const result = await supertest(app).post("/signin").send(login);
    expect(result.status).toEqual(401);
  });

  it("returns 401 for incorrect email", async () => {
    const create = await validData();
    await supertest(app).post("/signup").send(create);
    const login = { email: "1" + create.email, password: create.password };
    const result = await supertest(app).post("/signin").send(login);
    expect(result.status).toEqual(401);
  });

  it("returns 422 for empty fields", async () => {
    const body = await emptyFieldsSignIn();
    const result = await supertest(app).post("/signin").send(body);
    expect(result.status).toEqual(422);
  });

  it("returns 422 for no body sent", async () => {
    const result = await supertest(app).post("/signin").send({});
    expect(result.status).toEqual(422);
  });

  it("returns 422 for invalid fields", async () => {
    const body = await invalidJoiValidationSignIn();
    const result = await supertest(app).post("/signin").send(body);
    expect(result.status).toEqual(422);
  });
});

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
  await prisma.$disconnect();
});
