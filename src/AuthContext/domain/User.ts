export class User {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly password: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    static create(id: string, email: string, password: string): User {
        return new User(id, email, password, new Date(), new Date());
    }
}