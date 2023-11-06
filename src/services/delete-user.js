import { PostgresDeleteUserRepository } from '../repositories/postgres/index.js';

export class DeleteUserService {
    async execute(userId) {
        const deleteUserRepository = new PostgresDeleteUserRepository();

        const deletedUser = deleteUserRepository.execute(userId);

        return deletedUser;
    }
}
