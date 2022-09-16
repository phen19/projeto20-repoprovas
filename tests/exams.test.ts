import {app} from "../src/app"
import supertest from "supertest"
import {prisma} from "../src/database/database"
import { emptyFieldsExam, invalidJoiValidationExam, validExamData } from "./factories/examFactory"
import { validData, validDataSignIn } from "./factories/authFactory"

beforeAll(async () =>{
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
    await prisma.$executeRaw`TRUNCATE TABLE tests RESTART IDENTITY CASCADE`
})

describe("POST /exams -> create exam",() => {
    it('returns 201 for created', async () => {
        const create = await validData()
        const teste = await supertest(app).post("/signup").send(create)
        console.log(teste.body)
        console.log(teste.status)
        const login = await validDataSignIn()
        const response = await supertest(app).post("/signin").send(login)
        console.log(response.body)
        const token = response.body.token
        const body = await validExamData()
        const result = await supertest(app).post("/exams").set("Authorization", 'Bearer '+ token).send(body)
        expect(result.status).toEqual(201)
    })

    it('returns 401 for invalid token', async () => {
        const create = await validData()
        await supertest(app).post("/signup").send(create)
        const login = await validDataSignIn()
        const response = await supertest(app).post("/signin").send(login)
        const token = `${response.body.token}1`
        const body = await validExamData()
        const result = await supertest(app).post("/exams").set("Authorization", 'Bearer '+ token).send(body)
        expect(result.status).toEqual(401)
    })

    it('returns 401 for token not sent', async () => {
        const body = await validExamData()
        const result = await supertest(app).post("/exams").send(body)
        expect(result.status).toEqual(401)
    })

    it('returns 422 for empty fields', async () => {
        const create = await validData()
        const teste = await supertest(app).post("/signup").send(create)
        const login = await validDataSignIn()
        const response = await supertest(app).post("/signin").send(login)
        const token = response.body.token
        const body = await emptyFieldsExam()
        const result = await supertest(app).post("/exams").set("Authorization", 'Bearer '+ token).send(body)
        expect(result.status).toEqual(422)
    })

    it('returns 422 for fields required', async () => {
        const create = await validData()
        const teste = await supertest(app).post("/signup").send(create)
        const login = await validDataSignIn()
        const response = await supertest(app).post("/signin").send(login)
        const token = response.body.token
   
        const result = await supertest(app).post("/exams").set("Authorization", 'Bearer '+ token).send({})
        expect(result.status).toEqual(422)
    })

    it('returns 422 for joi validation', async () => {
        const create = await validData()
        const teste = await supertest(app).post("/signup").send(create)
        const login = await validDataSignIn()
        const response = await supertest(app).post("/signin").send(login)
        const token = response.body.token
        const body = await invalidJoiValidationExam()
        const result = await supertest(app).post("/exams").set("Authorization", 'Bearer '+ token).send(body)
        expect(result.status).toEqual(422)
    })

})

describe('GET /exams -> getting exams by disciplines/terms', () => {
    it('return 200 and body in array format', async() => {
        const create = await validData()
        const teste = await supertest(app).post("/signup").send(create)
        const login = await validDataSignIn()
        const response = await supertest(app).post("/signin").send(login)
        const token = response.body.token
        const result = await supertest(app).get("/exams/disciplines").set("Authorization", 'Bearer '+ token).send()
        expect(result.status).toEqual(200) 
        expect(result.body).toBeInstanceOf(Array)
    });
    
    it('return 401 for invalid token', async() => {
        const create = await validData()
        const teste = await supertest(app).post("/signup").send(create)
        const login = await validDataSignIn()
        const response = await supertest(app).post("/signin").send(login)
        const token = `${response.body.token}1`
        const result = await supertest(app).get("/exams/disciplines").set("Authorization", 'Bearer '+ token).send()
        expect(result.status).toEqual(401)
    });

    it('return 401 for token not sent', async() => {
        const result = await supertest(app).get("/exams/disciplines").send()
        expect(result.status).toEqual(401)
    });

  });

  describe('GET /exams -> getting exams by teachers', () => {
    it('return 200 and body in array format', async() => {
        const create = await validData()
        const teste = await supertest(app).post("/signup").send(create)
        const login = await validDataSignIn()
        const response = await supertest(app).post("/signin").send(login)
        const token = response.body.token
        const result = await supertest(app).get("/exams/teachers").set("Authorization", 'Bearer '+ token).send()
        expect(result.status).toEqual(200) 
        expect(result.body).toBeInstanceOf(Array)
    });
    
    it('return 401 for invalid token', async() => {
        const create = await validData()
        const teste = await supertest(app).post("/signup").send(create)
        const login = await validDataSignIn()
        const response = await supertest(app).post("/signin").send(login)
        const token = `${response.body.token}1`
        const result = await supertest(app).get("/exams/teachers").set("Authorization", 'Bearer '+ token).send()
        expect(result.status).toEqual(401)
    });

    it('return 401 for token not sent', async() => {
        const result = await supertest(app).get("/exams/teachers").send()
        expect(result.status).toEqual(401)
    });

  });
afterAll(async () => {
    await prisma.$disconnect();
})