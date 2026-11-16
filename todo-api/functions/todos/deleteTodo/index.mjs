import { sendResponse } from "../../../responses/index.mjs"
import middy from '@middy/core';
import { createError } from '@middy/util';
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { deleteTodo, getTodoById } from "../../../services/todos.mjs";

export const handler = middy(async (event) => {
  const { id } = event.pathParameters;
  const todo = await getTodoById(id);

  if(!todo) throw createError(404, 'Todo not found');

  const deletedTodo = await deleteTodo(id);

  return sendResponse(200, { message : 'Todo deleted successfully!', todo: deletedTodo });
}).use(errorHandler());