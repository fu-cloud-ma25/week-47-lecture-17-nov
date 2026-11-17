import bcrypt from 'bcrypt';

// Hash password
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

// Compare passwords
export const comparePasswords = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
}