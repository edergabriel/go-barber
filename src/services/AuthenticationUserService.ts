import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import User from "../models/User";

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
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

        return {
            user
        }
    }
}

export default AuthenticateUserService
