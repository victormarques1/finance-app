import { EmailAlreadyInUseError } from '../../errors/user.js';
import {
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    emailIsAlreadyInUseResponse,
    invalidPasswordResponse,
    badRequest,
    created,
    serverError,
    validateRequiredFields,
    requiredFieldsIsMissingResponse,
} from '../helpers/index.js';

export class CreateUserController {
    constructor(createUserService) {
        this.createUserService = createUserService;
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];

            const { ok: requiredFieldWereProvided, missingField } =
                validateRequiredFields(params, requiredFields);

            if (!requiredFieldWereProvided) {
                return requiredFieldsIsMissingResponse(missingField);
            }

            const passwordIsValid = checkIfPasswordIsValid(params.password);

            if (!passwordIsValid) {
                return invalidPasswordResponse();
            }

            const emailIsValid = checkIfEmailIsValid(params.email);

            if (!emailIsValid) {
                return emailIsAlreadyInUseResponse();
            }

            const createdUser = await this.createUserService.execute(params);

            return created(createdUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }

            console.error(error);
            return serverError();
        }
    }
}
