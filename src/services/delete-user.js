export class DeleteUserService {
    constructor(deleteUserRepository) {
        this.deleteUserRepository = deleteUserRepository;
    }

    async execute(userId) {
        const deletedUser = this.deleteUserRepository.execute(userId);

        return deletedUser;
    }
}
