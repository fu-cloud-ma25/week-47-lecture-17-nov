import { sendResponse } from "../../../responses/index.mjs"
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { addUser } from "../../../services/users.mjs";

export const handler = middy(async (event) => {
  const { username, password } = event.body;
  const user = await addUser({ username, password });
  return sendResponse(200, { message : 'User created successfully', user });
}).use(httpJsonBodyParser())
  .use(errorHandler());