import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    transactionNotFoundResponse,
} from '../helpers/index.js';

export class DeleteTransactionController {
    constructor(deleteTransactionService) {
        this.deleteTransactionService = deleteTransactionService;
    }

    async execute(httpRequest) {
        try {
            const idIsValid = checkIfIdIsValid(
                httpRequest.params.transactionId
            );

            if (!idIsValid) {
                return invalidIdResponse();
            }

            const transaction = await this.deleteTransactionService.execute(
                httpRequest.params.transactionId
            );

            if (!transaction) {
                return transactionNotFoundResponse();
            }

            return ok(transaction);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
