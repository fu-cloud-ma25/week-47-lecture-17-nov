import { sendResponse } from "../../../responses/index.mjs"
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { addTodo } from "../../../services/todos.mjs";

export const handler = middy(async (event) => {
  const { task } = event.body;

  const todo = await addTodo({
    id : crypto.randomUUID().slice(0, 5),
    task,
    done : false
  });

  return sendResponse(200, { message : 'Todo added successfully!', todo });
}).use(httpJsonBodyParser())
  .use(errorHandler());