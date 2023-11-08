import { UserNotFoundError } from '../../errors/user.js';

export class GetTransactionsByUserIdService {
    constructor(getTransactionsByUserIdRepository, getUserByIdRepository) {
        this.getTransactionsByUserIdRepository =
            getTransactionsByUserIdRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(params) {
        //validar se o usuario existe
        const user = await this.getUserByIdRepository.execute(params.userId);

        if (!user) {
            throw new UserNotFoundError(params.userId);
        }

        //chamar repository
        const transactions =
            await this.getTransactionsByUserIdRepository.execute(params.userId);

        return transactions;
    }
}
