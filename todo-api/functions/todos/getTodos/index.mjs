import { sendResponse } from "../../../responses/index.mjs"
import middy from '@middy/core';
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { getTodos } from "../../../services/todos.mjs";

export const handler = middy(async (event) => {
  const todos = await getTodos();
  return sendResponse(200, { todos });
}).use(errorHandler());