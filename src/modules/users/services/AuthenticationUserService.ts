import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import { sign } from 'jsonwebtoken';
import User from "../entities/User";

import authConfig from '../../../config/auth';

import AppError from '../../../shared/errors/AppError';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({email, password}: Request): Promise<Response> {
        const usersRepository = getRepository(User)

        const user = await usersRepository.findOne({ where: { email }});

        if(!user) {
            throw new AppError('Email/senha erradas', 401);
        }

        const passwordMatched = await compare(password, String(user.password));
        if(!passwordMatched) {
            throw new AppError('Email/senha erradas', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        })

        return {
            user,
            token
        }
    }
}

export default AuthenticateUserService
