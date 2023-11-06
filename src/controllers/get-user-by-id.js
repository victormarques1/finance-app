import { GetUserByIdService } from '../services/get-user-by-id.js';
import {
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from './helpers/index.js';

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const isIdValid = checkIfIdIsValid(userId);

            if (!isIdValid) {
                return invalidIdResponse();
            }

            const getUserByIdService = new GetUserByIdService();

            const user = await getUserByIdService.execute(
                httpRequest.params.userId
            );

            if (!user) {
                return userNotFoundResponse();
            }

            return ok(user);
        } catch (error) {
            console.log(error);
            return serverError();
        }
    }
}
