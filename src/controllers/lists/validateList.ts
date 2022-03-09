import Joi from "joi";

const ListCreationSchema = Joi.object({
  tasks: Joi.array().required().min(1),
  title: Joi.string().required().min(3).max(100),
});

const ListSchema = Joi.object({
  tasks: Joi.array().required().min(1),
  title: Joi.string().required().min(3).max(100),
  _id: Joi.string().required(),
  done: Joi.boolean(),
});

const validateListCreation = (user: unknown, full: boolean = false) => {
  const schema = full ? ListSchema : ListCreationSchema;
  const result = ListCreationSchema.validate(user, {
    allowUnknown: false,
    convert: true,
    abortEarly: false,
  });

  return result?.error?.message;
};

export default validateListCreation;
