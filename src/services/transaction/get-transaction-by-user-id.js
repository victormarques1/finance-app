import { userNotFoundResponse } from '../../controllers/helpers/index.js';

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
            return userNotFoundResponse();
        }

        //chamar repository
        const transactions =
            await this.getTransactionsByUserIdRepository.execute(params.userId);

        return transactions;
    }
}
