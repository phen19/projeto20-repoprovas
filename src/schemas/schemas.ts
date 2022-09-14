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
}