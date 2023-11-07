import {
    CreateUserController,
    DeleteUserController,
    GetUserByIdController,
    UpdateUserController,
} from '../../controllers/index.js';
import {
    PostgresCreateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserByEmailRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateUserRepository,
} from '../../repositories/postgres/index.js';
import {
    CreateUserService,
    DeleteUserService,
    GetUserByIdService,
    UpdateUserService,
} from '../../services/index.js';

export const makeGetUserByIdController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const getUserByIdService = new GetUserByIdService(getUserByIdRepository);

    const getUserByIdController = new GetUserByIdController(getUserByIdService);

    return getUserByIdController;
};

export const makeCreateUserController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const createdUserRepository = new PostgresCreateUserRepository();

    const createUserService = new CreateUserService(
        getUserByEmailRepository,
        createdUserRepository
    );

    const createUserController = new CreateUserController(createUserService);

    return createUserController;
};

export const makeUpdateUserController = () => {
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const updateUserRepository = new PostgresUpdateUserRepository();

    const updateUserService = new UpdateUserService(
        getUserByEmailRepository,
        updateUserRepository
    );

    const updateUserController = new UpdateUserController(updateUserService);

    return updateUserController;
};

export const makeDeleteUserController = () => {
    const deleteUserRepository = new PostgresDeleteUserRepository();

    const deleteUserService = new DeleteUserService(deleteUserRepository);

    const deleteUserController = new DeleteUserController(deleteUserService);

    return deleteUserController;
};
