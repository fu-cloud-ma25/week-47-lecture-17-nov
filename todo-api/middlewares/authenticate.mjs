import { verifyToken } from "../utils/jwt.mjs";
import { createError } from "@middy/util";

export const authenticate = () => ({
    before : (handler) => {
        const authHeader = handler.event.headers?.authorization;
        console.log('AUTH HEADER', authHeader);
        if(!authHeader) throw createError(401, ' Token is missing');

        const token = authHeader.split(' ')[1];
        if(!token) throw createError(401, 'Token is missing');
        console.log('TOKEN', token);

        try {
            const user = verifyToken(token);
            handler.event.user = user;
        } catch(error) {
            throw createError(401, 'Invalid or expired token');
        }
    } 
});