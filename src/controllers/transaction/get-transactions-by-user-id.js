import { UserNotFoundError } from '../../errors/user.js';
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    requiredFieldsIsMissingResponse,
    serverError,
    userNotFoundResponse,
} from '../helpers/index.js';

export class GetTransactionsByUserIdController {
    constructor(getTransactionsByUserIdService) {
        this.getTransactionsByUserIdService = getTransactionsByUserIdService;
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId;

            if (!userId) {
                return requiredFieldsIsMissingResponse('userId');
            }

            const userIdIsValid = checkIfIdIsValid(userId);

            if (!userIdIsValid) {
                return invalidIdResponse();
            }

            const transactions =
                await this.getTransactionsByUserIdService.execute({
                    userId: userId,
                });

            return ok(transactions);
        } catch (error) {
            console.error(error);

            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse();
            }
            return serverError();
        }
    }
}
