import {
    badRequest,
    checkIfIdIsValid,
    created,
    invalidIdResponse,
    serverError,
} from '../helpers/index.js';
import validator from 'validator';

export class CreateTransactionController {
    constructor(createTransactionService) {
        this.createTransactionService = createTransactionService;
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            const requiredFields = [
                'id',
                'user_id',
                'name',
                'date',
                'amount',
                'type',
            ];

            for (const field of requiredFields) {
                if (!params[field || params[field].trim().length === 0]) {
                    return badRequest({ message: `Missing param: ${field}` });
                }
            }

            const userIdIsValid = checkIfIdIsValid(params.user_id);

            if (!userIdIsValid) {
                return invalidIdResponse();
            }

            if (params.amount <= 0) {
                return badRequest({
                    message: 'The amount must be greater than 0.',
                });
            }

            const amountIsValid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                    decimal_separator: '.',
                }
            );

            if (!amountIsValid) {
                return badRequest({
                    message: 'The amount must be a valid currency.',
                });
            }

            const type = params.type.trim().toUpperCase();

            const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(
                type
            );

            if (!typeIsValid) {
                return badRequest({
                    message: 'The type must be EARNING, EXPENSE or INVESTMENT',
                });
            }

            const transaction = await this.createTransactionService.execute({
                ...params,
                type,
            });

            return created(transaction);
        } catch (error) {
            console.log(error);
            return serverError();
        }
    }
}
