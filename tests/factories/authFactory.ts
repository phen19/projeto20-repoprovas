export async function validData(){
    return {
        email: "paulo1@driven.com.br",
        password : "1510",
        confirmPassword : "1510"
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

export async function validDataSignIn(){
    return {
        email: "paulo1@driven.com.br",
        password : "1510"
      }
}

export async function incorrectPassword(){
    return {
        email: "paulo1@driven.com.br",
        password : "1511"
      }
}

export async function incorrectEmail(){
    return {
        email: "paulo1@driven.com",
        password : "1510"
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