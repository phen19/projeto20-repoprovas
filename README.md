# projeto20-repoprovas

<p align="center">
  <img  src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4dd.svg">
</p>
<h1 align="center">
  Valex
</h1>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

# Rotas de criação e login de usuários:

## Rota <span style="color:yellow"> **POST** </span>/signup

Sua função é criar novos usuários.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "email": "email_do_usuário", //number
  "password": "senha", //string
  "confirmPassword":"confirmação_de_senha"//string
}
```

## Rota <span style="color:orange"> **POST** </span>/signin

Sua função é logar o usuário.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "emai": "email_do_usuário", //string
  "password": "senha" //string
}
```


# Rotas de provas:

## Rota <span style="color:yellow"> **POST** </span>/exams

Essa é uma rota autenticada com um header http do tipo "Authorization Bearer". Sua função é criar provas no banco.


O Body da requisição deve ser feito no seguinte formato:

```json
{
  "name": "nome_da_prova", //string,
  "pdfUrl": "url_prova_pdf",//string,
  "category":"categoria_da_prova",//string,
  "discipline: "disciplina_da_prova",//string,
  "teacher": "professor_da_disciplina"//string
}
```

## Rota <span style="color:yellow"> **GET** </span>/exams/disciplines

Essa é uma rota autenticada com um header http do tipo "Authorization Bearer". Sua função é buscar no banco as provas agrupadas por disciplinas

A resposta da requisição deve vir no seguinte formato:

```json
[{
  "number": "período", //string
  "disciplines": [{
        "name":"nome_disciplina", //string
        "categories": [{
              "category": "nome_categoria", //string
              "tests": [{
                    "id": "id_da_prova", //number
                    "name": "nome_da_prova", //string
                    "pdfUrl": "url_prova_pdf", //string,
                    "teacher": "nome_do_professor", //string
                  }]
          }]
    }] 
}]
