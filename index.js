import 'dotenv/config.js';
import express from 'express';
import {
    CreateUserController,
    DeleteUserController,
    GetUserByIdController,
    UpdateUserController,
} from './src/controllers/index.js';
import { GetUserByIdService } from './src/services/get-user-by-id.js';
import { PostgresGetUserByIdRepository } from './src/repositories/postgres/get-user-by-id.js';
import { PostgresCreateUserRepository } from './src/repositories/postgres/create-user.js';
import { PostgresGetUserByEmailRepository } from './src/repositories/postgres/get-user-by-email.js';
import { CreateUserService } from './src/services/create-user.js';
import { PostgresUpdateUserRepository } from './src/repositories/postgres/update-user.js';
import { PostgresDeleteUserRepository } from './src/repositories/postgres/delete-user.js';
import { UpdateUserService } from './src/services/update-user.js';
import { DeleteUserService } from './src/services/delete-user.js';

const app = express();

app.use(express.json());

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const getUserByIdService = new GetUserByIdService(getUserByIdRepository);

    const getUserByIdController = new GetUserByIdController(getUserByIdService);

    const { statusCode, body } = await getUserByIdController.execute(request);

    response.status(statusCode).send(body);
});

app.post('/api/users', async (request, response) => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const createUserRepository = new PostgresCreateUserRepository();

    const createUserService = new CreateUserService(
        getUserByEmailRepository,
        createUserRepository
    );

    const createUserController = new CreateUserController(createUserService);

    const { statusCode, body } = await createUserController.execute(request);

    response.status(statusCode).send(body);
});

app.patch('/api/users/:userId', async (request, response) => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const updateUserRepository = new PostgresUpdateUserRepository();

    const updateUserService = new UpdateUserService(
        getUserByEmailRepository,
        updateUserRepository
    );

    const updateUserController = new UpdateUserController(updateUserService);

    const { statusCode, body } = await updateUserController.execute(request);

    response.status(statusCode).send(body);
});

app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserRepository = new PostgresDeleteUserRepository();

    const deleteUserService = new DeleteUserService(deleteUserRepository);

    const deleteUserController = new DeleteUserController(deleteUserService);

    const { statusCode, body } = await deleteUserController.execute(request);

    response.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}`)
);
