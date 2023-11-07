import { badRequest, notFound } from './http.js';
import validator from 'validator';

export const invalidPasswordResponse = () =>
    badRequest({
        message: 'Password must be at least 6 characters',
    });

export const emailIsAlreadyInUseResponse = () =>
    badRequest({
        message: 'Password must be at least 6 characters',
    });

export const userNotFoundResponse = () =>
    notFound({ message: 'User not found' });

export const checkIfPasswordIsValid = (password) => password.length >= 6;

export const checkIfEmailIsValid = (email) => validator.isEmail(email);
