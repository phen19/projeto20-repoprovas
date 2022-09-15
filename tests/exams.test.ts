import {app} from "../src/app"
import supertest from "supertest"
import {prisma} from "../src/database/database"
import { validExamData } from "./factories/examFactory"
import { validData, validDataSignIn } from "./factories/authFactory"

beforeAll(async () =>{
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE tests RESTART IDENTITY CASCADE`
})

describe("POST /exams -> create exam",() => {
 let token:string = ""
    it('returns 201 for created', async () => {
        const create = validData()
        await supertest(app).post("/signup").send(create)
        const login = validDataSignIn()
        const response = await supertest(app).post("/signin").send(login)
        token = response.body.token
        const body = validExamData()
        const result = await supertest(app).post("/exams").set("Authorization", 'Bearer '+ token).send(body)
        expect(result.status).toEqual(201)
    })
})

afterAll(async () => {
    await prisma.$disconnect();
})