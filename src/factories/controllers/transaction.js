import {
    CreateTransactionController,
    DeleteTransactionController,
    GetTransactionsByUserIdController,
    UpdateTransactionController,
} from '../../controllers/index.js';

import {
    PostgresCreateTransactionRepository,
    PostgresGetUserByIdRepository,
    PostgresGetTransactionsByUserIdRepository,
    PostgresUpdateTransactionRepository,
    PostgresDeleteTransactionRepository,
} from '../../repositories/postgres/index.js';
import {
    CreateTransactionService,
    DeleteTransactionService,
    GetTransactionsByUserIdService,
    UpdateTransactionService,
} from '../../services/index.js';

export const makeCreateTransactionController = () => {
    const createTransactionRepository =
        new PostgresCreateTransactionRepository();

    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const createTransactionService = new CreateTransactionService(
        createTransactionRepository,
        getUserByIdRepository
    );

    const createTransactionController = new CreateTransactionController(
        createTransactionService
    );

    return createTransactionController;
};

export const makeGetTransactionsByUserIdController = () => {
    const getTransactionsByUserIdRepository =
        new PostgresGetTransactionsByUserIdRepository();

    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const getTransactionsByUserIdService = new GetTransactionsByUserIdService(
        getTransactionsByUserIdRepository,
        getUserByIdRepository
    );

    const getTransactionsByUserIdController =
        new GetTransactionsByUserIdController(getTransactionsByUserIdService);

    return getTransactionsByUserIdController;
};

export const makeUpdateTransactionController = () => {
    const updateTrasactionRepository =
        new PostgresUpdateTransactionRepository();

    const updateTransactionService = new UpdateTransactionService(
        updateTrasactionRepository
    );

    const updateTransactionController = new UpdateTransactionController(
        updateTransactionService
    );

    return updateTransactionController;
};

export const makeDeleteTransactionController = () => {
    const deleteTrasactionRepository =
        new PostgresDeleteTransactionRepository();

    const deleteTransactionService = new DeleteTransactionService(
        deleteTrasactionRepository
    );

    const deleteTransactionController = new DeleteTransactionController(
        deleteTransactionService
    );

    return deleteTransactionController;
};
