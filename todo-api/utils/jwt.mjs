import jwt from 'jsonwebtoken';

// Sign token
export const signToken = (payload) => {
    return jwt.sign(payload, 'jesperärcool', { expiresIn : '1h' });
}

// Verify token
export const verifyToken = (token) => {
    return jwt.verify(token, 'jesperärcool');
}