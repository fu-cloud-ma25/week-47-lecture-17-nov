import { sendResponse } from "../../../responses/index.mjs"
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { addUser } from "../../../services/users.mjs";
import { hashPassword } from '../../../utils/bcrypt.mjs';
import { validateBody } from "../../../middlewares/validation.mjs";
import { registerSchema } from "../../../models/auth.mjs";

export const handler = middy(async (event) => {
  const { username, password } = event.body;
  const user = await addUser({
    username,
    password : await hashPassword(password)
  });
  return sendResponse(200, { message : 'User created successfully', user });
}).use(httpJsonBodyParser())
  .use(validateBody(registerSchema))
  .use(errorHandler());