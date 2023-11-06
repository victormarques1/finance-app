import {
    checkIfIdIsValid,
    invalidIdResponse,
    userNotFoundResponse,
    ok,
    serverError,
} from './helpers/index.js';

export class GetUserByIdController {
    constructor(getUserByIdService) {
        this.getUserByIdService = getUserByIdService;
    }

    async execute(httpRequest) {
        try {
            const isIdValid = checkIfIdIsValid(httpRequest.params.userId);

            if (!isIdValid) {
                return invalidIdResponse();
            }

            const user = await this.getUserByIdService.execute(
                httpRequest.params.userId
            );

            if (!user) {
                return userNotFoundResponse();
            }

            return ok(user);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
