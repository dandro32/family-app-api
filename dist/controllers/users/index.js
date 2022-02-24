"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersControllerFactory = (usersRepositoryFactory) => {
    return {
        async getUsers(_, res, next) {
            try {
                const users = await usersRepositoryFactory.findAll();
                res.json(users);
            }
            catch (e) {
                next(e);
            }
        },
        async getMe(req, res, next) {
            try {
                const me = await usersRepositoryFactory.findOne(req.params.id);
                res.json(me);
            }
            catch (e) {
                next(e);
            }
        },
    };
};
exports.default = usersControllerFactory;
