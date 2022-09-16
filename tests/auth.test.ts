import {app} from "../src/app"
import supertest from "supertest"
import {prisma} from "../src/database/database"
import { emptyFields, emptyFieldsSignIn, incorrectEmail, incorrectPassword, invalidJoiValidation, invalidJoiValidationSignIn, validData, validDataSignIn } from "./factories/authFactory"

beforeAll(async () =>{
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`
})


describe("POST /signup -> create user",() => {
     it('returns 201 for created', async () => {
        const body = await validData()
        const result = await supertest(app).post("/signup").send(body)
        expect(result.status).toEqual(201)
    })

    it('returns 409 for conflict', async () => {
        const body = await validData()
        await supertest(app).post("/signup").send(body)
        const result = await supertest(app).post("/signup").send(body)
        
        expect(result.status).toEqual(409)
    })

    it('returns 422 for empty fields', async () => {
        const body = await emptyFields()
        const result = await supertest(app).post("/signup").send(body)

        expect(result.status).toEqual(422)
    })

    it('returns 422 for no body sent', async () => {
        const result = await supertest(app).post("/signup").send({})

        expect(result.status).toEqual(422)
    })

    it('returns 422 for invalid fields', async () => {
        const body = invalidJoiValidation()
        const result = await supertest(app).post("/signup").send(body)

        expect(result.status).toEqual(422)
    })

})

describe("POST /signin -> user login",() => {
    it('returns 200 for success login', async () => {
        const insertUser = await validData()
        await supertest(app).post("/signup").send(insertUser)
        const body = await validDataSignIn()
        const result = await supertest(app).post("/signin").send(body)

       expect(result.status).toEqual(200)
   })

   it('returns 401 for incorrect password', async () => {
       const body = await incorrectPassword()
       const result = await supertest(app).post("/signin").send(body)

       expect(result.status).toEqual(401)
   })

   it('returns 401 for incorrect email', async () => {
        const body = await incorrectEmail()
        const result = await supertest(app).post("/signin").send(body)

        expect(result.status).toEqual(401)
    })

   it('returns 422 for empty fields', async () => {
       const body = await emptyFieldsSignIn()
       const result = await supertest(app).post("/signin").send(body)

       expect(result.status).toEqual(422)
   })

   it('returns 422 for no body sent', async () => {
       const result = await supertest(app).post("/signin").send({})
       expect(result.status).toEqual(422)
   })

   it('returns 422 for invalid fields', async () => {
       const body = await invalidJoiValidationSignIn()
       const result = await supertest(app).post("/signin").send(body)

       expect(result.status).toEqual(422)
   })

})

afterAll(async () => {
    await prisma.$disconnect();
})