import {app} from "../src/app"
import supertest from "supertest"
import {prisma} from "../src/database/database"
import { emptyFields, emptyFieldsSignIn, incorrectEmail, incorrectPassword, invalidJoiValidation, invalidJoiValidationSignIn, validData, validDataSignIn } from "./factories/authFactory"

beforeAll(async () =>{
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`
})

describe("POST /signup -> create user",() => {
     it('returns 201 for created', async () => {
        const body = validData()
        const result = await supertest(app).post("/signup").send(body)

        expect(result.status).toEqual(201)
    })

    it('returns 409 for conflict', async () => {
        const body = validData()
        const result = await supertest(app).post("/signup").send(body)

        expect(result.status).toEqual(409)
    })

    it('returns 422 for empty fields', async () => {
        const body = emptyFields()
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
       const body = validDataSignIn()
       const result = await supertest(app).post("/signin").send(body)

       expect(result.status).toEqual(200)
       console.log(result.body.token)
   })

   it('returns 401 for incorrect password', async () => {
       const body = incorrectPassword()
       const result = await supertest(app).post("/signin").send(body)

       expect(result.status).toEqual(401)
   })

   it('returns 401 for incorrect email', async () => {
        const body = incorrectEmail()
        const result = await supertest(app).post("/signin").send(body)

        expect(result.status).toEqual(401)
    })

   it('returns 422 for empty fields', async () => {
       const body = emptyFieldsSignIn()
       const result = await supertest(app).post("/signin").send(body)

       expect(result.status).toEqual(422)
   })

   it('returns 422 for no body sent', async () => {
       const result = await supertest(app).post("/signin").send({})
       expect(result.status).toEqual(422)
   })

   it('returns 422 for invalid fields', async () => {
       const body = invalidJoiValidationSignIn()
       const result = await supertest(app).post("/signin").send(body)

       expect(result.status).toEqual(422)
   })

})

afterAll(async () => {
    await prisma.$disconnect();
})