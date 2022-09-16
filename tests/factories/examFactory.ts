export async function validExamData(){
    return {
        name : "Globo.com",
        pdfUrl: "https://www.driven.com.br/",
        category: "1",
        discipline:"1",
        teacher: "1"
      }
}

export async function emptyFieldsExam(){
  return{
    name : "",
    pdfUrl: "",
    category: "",
    discipline:"",
    teacher: ""
  }
}

export async function invalidJoiValidationExam(){
  return{
    name : 1,
    pdfUrl: "www.driven.com.br/",
    category: "8",
    discipline:"8",
    teacher: "8"
  }
}