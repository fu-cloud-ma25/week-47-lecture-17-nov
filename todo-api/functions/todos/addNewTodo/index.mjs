import { sendResponse } from "../../../responses/index.mjs"
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { addTodo } from "../../../services/todos.mjs";
import { authenticate } from "../../../middlewares/authenticate.mjs";
import { validateBody } from "../../../middlewares/validation.mjs";
import { todoSchema } from "../../../models/todos.mjs";

export const handler = middy(async (event) => {
  const { task } = event.body;

  const todo = await addTodo({
    id : crypto.randomUUID().slice(0, 5),
    task,
    done : false,
    createdBy : event.user.username
  });

  return sendResponse(200, { message : 'Todo added successfully!', todo });
}).use(httpJsonBodyParser())
  .use(validateBody(todoSchema))
  .use(authenticate())
  .use(errorHandler());