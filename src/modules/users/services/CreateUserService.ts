import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

import { hash } from 'bcryptjs';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
    name: string;
    email: string;
    password: string;
}


class CreateUserService {
    constructor(private usersRepository: IUsersRepository) {}

    public async execute({name, email, password}: IRequest): Promise<User> {
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if(checkUserExists) {
            throw new AppError('Email já utilizado');
        }

        const passwordCryp = await hash(password, 8)

        const user = await this.usersRepository.create({
            name,
            email,
            password: passwordCryp
        })

        return user;
    }
}

export default CreateUserService
