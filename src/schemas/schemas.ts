import joi from "joi";

export const schemas = {
    signUpSchema:joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().required(),
        confirmPassword: joi.any().valid(joi.ref("password")).required(),
    }),
    signInSchema: joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().required(),
    }),
    examSchema: joi.object().keys({
        name: joi.string().required(),
        pdfUrl: joi.string().uri().required(),
        category: joi.string().valid('1', '2', '3', 'Projeto', 'Prática', 'Recuperação'),
        discipline: joi.string().valid('1', '2', '3', '4', '5', '6', 'HTML e CSS','JavaScript', 'React', 'Humildade', 'Planejamento', 'Autoconfiança' ),
        teacher: joi.string().valid('1', '2', 'Diego Pinho', 'Bruna Hamori')
    })
}