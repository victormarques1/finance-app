import { badRequest, ok, serverError } from './helpers.js';
import { GetUserByIdService } from '../services/get-user-by-id.js';
import validator from 'validator';

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = validator.isUUID(httpRequest.params.userId);

            if (!isIdValid) {
                return badRequest({
                    message: 'The provided ID is not valid.',
                });
            }

            const getUserByIdService = new GetUserByIdService();

            const user = await getUserByIdService.execute(
                httpRequest.params.userId
            );

            return ok(user);
        } catch (error) {
            console.log(error);
            return serverError();
        }
    }
}
