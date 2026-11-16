import { db } from './db.mjs'; 
import {
    GetCommand,
    PutCommand
} from '@aws-sdk/lib-dynamodb';
import { createError } from '@middy/util';

// Add new user
export const addUser = async (user) => {
    const command = new PutCommand({
        TableName: 'TodoDB',
        Item: {
            PK: 'USER',
            SK: user.username,
            ...user
        }
    });

    try {
        await db.send(command);
        return user;
    } catch (error) {
        console.error('Error adding user:', error);
        throw createError(500, 'Could not add user');
    }
}

// Get user by username
export const getUserByUsername = async (username) => {
    const command = new GetCommand({
        TableName: 'TodoDB',
        Key: {
            PK: 'USER',
            SK: username
        }
    });

    try {
        const result = await db.send(command);
        return result.Item;
    } catch (error) {
        console.error('Error getting user:', error);
        throw createError(500, 'Could not fetch user');
    }
}