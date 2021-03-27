import { Router } from 'express';
import AuthenticateUserService from '../../../services/AuthenticationUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import { container } from 'tsyringe';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;
    const usersRepository = new UsersRepository();

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
        email,
        password
    })

    delete user.password;

    return response.json({ user, token });

});

export default sessionsRouter;
