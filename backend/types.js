// This file constains all the validation schema's for inputs we will be receiving from the users
// Using the Zod library

const z = require("zod");

const todoSchema = z.object({
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
});

const todoUpdateSchema = z.object({
  id: z.string(),
});

module.exports = {
  todoSchema: todoSchema,
  todoUpdateSchema: todoUpdateSchema,
};
