import {
    checkIfAmountIsValid,
    checkIfIdIsValid,
    checkIfTypeIsValid,
    created,
    invalidAmountResponse,
    invalidIdResponse,
    invalidTypeResponse,
    requiredFieldsIsMissingResponse,
    serverError,
    validateRequiredFields,
} from '../helpers/index.js';

export class CreateTransactionController {
    constructor(createTransactionService) {
        this.createTransactionService = createTransactionService;
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            const requiredFields = [
                'user_id',
                'name',
                'date',
                'amount',
                'type',
            ];

            const { ok: requiredFieldWereProvided, missingField } =
                validateRequiredFields(params, requiredFields);

            if (!requiredFieldWereProvided) {
                return requiredFieldsIsMissingResponse(missingField);
            }

            const userIdIsValid = checkIfIdIsValid(params.user_id);

            if (!userIdIsValid) {
                return invalidIdResponse();
            }

            const amountIsValid = checkIfAmountIsValid(params.amount);

            if (!amountIsValid) {
                return invalidAmountResponse();
            }

            const type = params.type.trim().toUpperCase();

            const typeIsValid = checkIfTypeIsValid(type);

            if (!typeIsValid) {
                return invalidTypeResponse();
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
