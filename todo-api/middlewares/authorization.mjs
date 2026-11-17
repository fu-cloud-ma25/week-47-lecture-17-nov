import { getTodoById } from "../services/todos.mjs";
import { createError } from "@middy/util";

export const authorize = () => ({
    before : async (handler) => {
        const { id } = handler.event.pathParameters;
        const user = handler.event.user;
        if(!user) throw createError(401, 'User not authenticated');

        const todo = await getTodoById(id);

        if(todo.createdBy !== user.username) throw createError(403, 'Forbidden: User not authorized');
    }
});