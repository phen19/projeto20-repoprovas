import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { prisma } from "../../src/database/database";
import jwt from "jsonwebtoken";
require("dotenv").config({ path: "./.env.test" });
export async function validData() {
  const password = faker.internet.password();
  return {
    email: faker.internet.email(),
    password: password,
    confirmPassword: password,
  };
}

export async function emptyFields() {
  return {
    email: "",
    password: "",
    confirmPassword: "",
  };
}

export async function invalidJoiValidation() {
  return {
    email: "paulodriven.com.br",
    password: 11,
    confirmPassword: 1,
  };
}

export async function emptyFieldsSignIn() {
  return {
    email: "",
    password: "",
  };
}

export async function invalidJoiValidationSignIn() {
  return {
    email: "paulodriven.com.br",
    password: 11,
  };
}

export async function insertUser() {
  const create = await validData();
  const hashedPassword = await bcrypt.hash(create.password, 10);
  const insertedUser = await prisma.users.create({
    data: { email: create.email, password: hashedPassword },
  });
  return insertedUser;
}

export async function getToken(id: number) {
  const secretKey: string | undefined = process.env.JWT_SECRET;
  const token: string = jwt.sign({ id: id }, secretKey!);
  const obj: { token: string } = { token };
  return obj;
}
