import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import { sign } from 'jsonwebtoken';
import User from "../models/User";

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
            throw new Error('Email/senha erradas');
        }

        const passwordMatched = await compare(password, String(user.password));
        if(!passwordMatched) {
            throw new Error('Email/senha erradas');
        }

        const token = sign({},'88181fb72ce6bcaea828f57b3db3df19', {
            subject: user.id,
            expiresIn: '1d'
        })

        return {
            user,
            token
        }
    }
}

export default AuthenticateUserService
