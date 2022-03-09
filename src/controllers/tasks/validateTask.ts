import Joi from "joi";

const TaskCreationSchema = Joi.object({
  listId: Joi.string().required(),
  username: Joi.string().required(),
  title: Joi.string().required().min(3).max(100),
});

const TaskSchema = Joi.object({
  _id: Joi.string().required(),
  listId: Joi.string().required(),
  username: Joi.string().required(),
  title: Joi.string().required().min(3).max(100),
  done: Joi.boolean,
});

const validateTaskCreation = (user: unknown, full: boolean = false) => {
  const schema = full ? TaskSchema : TaskCreationSchema;
  const result = schema.validate(user, {
    allowUnknown: false,
    convert: true,
    abortEarly: false,
  });

  return result?.error?.message;
};

export default validateTaskCreation;
