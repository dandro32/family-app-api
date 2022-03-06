import Joi from "joi";

const TokenSchema = Joi.object({
  username: Joi.string().required(),
  token: Joi.string().required(),
});

const validateToken = (user: unknown) => {
  const result = TokenSchema.validate(user, {
    allowUnknown: false,
    convert: true,
    abortEarly: false,
  });

  return result?.error?.message;
};

export default validateToken;
