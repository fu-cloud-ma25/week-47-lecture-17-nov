import { z } from 'zod';

export const loginSchema = z.object({
    username : z.string(),
    password : z.string()
});

export const registerSchema = z.object({
    username : z
        .string()
        .min(6, 'Ditt anmvändarnamn måste bestå av minst 6 tecken')
        .max(15, 'Ditt användarnamn får som mest innehålla 15 tecken'),
    // At least one uppercase, one lowercase, one number and one special character
    password : z    
        .string()
        .min(8, 'Ditt lösenord måste innehålla minst 8 tecken')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
            'Ditt lösenord måste innehålla minst en stor bokstav, en liten bokstav, en siffra och ett specialtecken'
        )
});