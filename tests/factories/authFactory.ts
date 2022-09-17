import {faker} from "@faker-js/faker"
export async function validData(){
  const password = faker.internet.password()
    return {
        email: faker.internet.email(),
        password : password,
        confirmPassword: password
      }
}

export async function emptyFields(){
    return {
            email: "",
            password : "",
            confirmPassword : ""
          }
    
}

export async function invalidJoiValidation(){
    return {
        email: "paulodriven.com.br",
        password: 11,
        confirmPassword: 1
      }
}

export async function emptyFieldsSignIn(){
    return {
            email: "",
            password : ""
          }
    
}

export async function invalidJoiValidationSignIn(){
    return {
        email: "paulodriven.com.br",
        password: 11
      }
}