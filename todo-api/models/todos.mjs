import { z } from 'zod';

export const todoSchema = z.object({
    task : z.string().min(5, 'En todo måste bestå av minst 5 tecken')
});