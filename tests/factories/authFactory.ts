export function validData(){
    return {
        email: "paulo1@driven.com.br",
        password : "1510",
        confirmPassword : "1510"
      }
}

export function emptyFields(){
    return {
            email: "",
            password : "",
            confirmPassword : ""
          }
    
}

export function invalidJoiValidation(){
    return {
        email: "paulodriven.com.br",
        password: 11,
        confirmPassword: 1
      }
}

export function validDataSignIn(){
    return {
        email: "paulo1@driven.com.br",
        password : "1510"
      }
}

export function incorrectPassword(){
    return {
        email: "paulo1@driven.com.br",
        password : "1511"
      }
}

export function incorrectEmail(){
    return {
        email: "paulo1@driven.com",
        password : "1510"
      }
}

export function emptyFieldsSignIn(){
    return {
            email: "",
            password : ""
          }
    
}

export function invalidJoiValidationSignIn(){
    return {
        email: "paulodriven.com.br",
        password: 11
      }
}