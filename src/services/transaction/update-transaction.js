export class UpdateTransactionService {
    constructor(updateTransactionRepository) {
        this.updateTransactionRepository = updateTransactionRepository;
    }

    async execute(transactionId, params) {
        const transaction = await this.updateTransactionRepository.execute(
            transactionId,
            params
        );

        return transaction;
    }
}
