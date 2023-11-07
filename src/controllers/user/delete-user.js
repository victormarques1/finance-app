import {
    checkIfIdIsValid,
    invalidIdResponse,
    userNotFoundResponse,
    ok,
    serverError,
} from '../helpers/index.js';

export class DeleteUserController {
    constructor(deleteUserService) {
        this.deleteUserService = deleteUserService;
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const idIsValid = checkIfIdIsValid(userId);

            if (!idIsValid) {
                return invalidIdResponse();
            }

            const deletedUser = await this.deleteUserService.execute(userId);

            if (!deletedUser) {
                return userNotFoundResponse();
            }

            return ok(deletedUser);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
