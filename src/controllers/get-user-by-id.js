import { notFound, ok, serverError } from './helpers/http.js';
import { GetUserByIdService } from '../services/get-user-by-id.js';
import validator from 'validator';
import { invalidIdResponse } from './helpers/user.js';

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = validator.isUUID(httpRequest.params.userId);

            if (!isIdValid) {
                return invalidIdResponse();
            }

            const getUserByIdService = new GetUserByIdService();

            const user = await getUserByIdService.execute(
                httpRequest.params.userId
            );

            if (!user) {
                return notFound({
                    message: 'User not found.',
                });
            }

            return ok(user);
        } catch (error) {
            console.log(error);
            return serverError();
        }
    }
}
