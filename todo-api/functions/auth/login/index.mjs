import { sendResponse } from "../../../responses/index.mjs"
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { createError } from '@middy/util';
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { getUserByUsername } from "../../../services/users.mjs";
import { comparePasswords } from "../../../utils/bcrypt.mjs";
import { signToken } from '../../../utils/jwt.mjs';
import { validateBody } from "../../../middlewares/validation.mjs";
import { loginSchema } from "../../../models/auth.mjs";

export const handler = middy(async (event) => {
  const { username, password } = event.body;
  const user = await getUserByUsername(username);

  if(!user) throw createError(401, 'Invalid username or password');
  if(!await comparePasswords(password, user.password)) throw createError(401, 'Invalid username or password');

  const token = signToken({
    username
  });

  return sendResponse(200, { message : 'User logged in successfully!', token });
}).use(httpJsonBodyParser())
  .use(validateBody(loginSchema))
  .use(errorHandler());