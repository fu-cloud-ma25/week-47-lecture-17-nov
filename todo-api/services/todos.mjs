import { db } from './db.mjs';
import {
    QueryCommand,
    GetCommand,
    PutCommand,
    DeleteCommand
} from '@aws-sdk/lib-dynamodb';
import { createError } from '@middy/util';

// Get todos
export const getTodos = async (username) => {
    try {
        const command = new QueryCommand({
            TableName: 'TodoDB',
            IndexName: 'GSI1',
            KeyConditionExpression: 'GSI1PK = :user',
            ExpressionAttributeValues : {
                ':user' : `USER#${username}`
            }
        });

        const result = await db.send(command);
        return result.Items;
    } catch (error) {
        console.error('Error getting todos:', error);
        throw createError(500, 'Could not fetch todos');
    }
};

export const getTodoById = async (todoId) => {
    try {
        const command = new GetCommand({
            TableName: 'TodoDB',
            Key: {
                PK: 'TODO',
                SK: todoId
            }
        });

        const result = await db.send(command);
        return result.Item;
    } catch (error) {
        console.error('Error getting todo by ID:', error);
        throw createError(500, 'Could not fetch todo');
    }
};

// Add a new todo
export const addTodo = async (todo) => {
    try {
        const command = new PutCommand({
            TableName: 'TodoDB',
            Item: {
                PK: 'TODO',
                SK: todo.id,
                ...todo,
                GSI1PK: `USER#${todo.createdBy}`,
                GSI1SK: `TODO#${todo.id}`
            }
        });

        await db.send(command);
        return todo;
    } catch (error) {
        console.error('Error adding todo:', error);
        throw createError(500, 'Could not add todo');
    }
};

// Delete a todo
export const deleteTodo = async (todoId) => {
    try {
        const command = new DeleteCommand({
            TableName: 'TodoDB',
            Key: {
                PK: 'TODO',
                SK: todoId
            },
            ReturnValues: 'ALL_OLD'
        });

        const result = await db.send(command);
        return result.Attributes;
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw createError(500, 'Could not delete todo');
    }
};