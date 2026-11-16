import { sendResponse } from "../../../responses/index.mjs"
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { createError } from '@middy/util';
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { getUserByUsername } from "../../../services/users.mjs";

export const handler = middy(async (event) => {
  const { username, password } = event.body;
  const user = await getUserByUsername(username);

  if(!user) throw createError(401, 'Invalid username or password');
  if(user.password !== password) throw createError(401, 'Invalid username or password');

  return sendResponse(200, { message : 'User logged in successfully!' });
}).use(httpJsonBodyParser())
  .use(errorHandler());