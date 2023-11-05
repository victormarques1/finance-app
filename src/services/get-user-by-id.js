import { PostgresGetUserByIdRepository } from '../repositories/postgres/get-user-by-id.js';

export class GetUserByIdService {
    async execute(userId) {
        const getUserByIdRepository = new PostgresGetUserByIdRepository();

        const user = await getUserByIdRepository.execute(userId);

        return user;
    }
}
