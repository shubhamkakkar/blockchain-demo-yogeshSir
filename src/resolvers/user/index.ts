export default {
    Query: {
        // @ts-ignore
        users: (parent, args, {models}) => {
            return Object.values(models.users);
        },
        // @ts-ignore
        user: (parent, {id}, {models}) => {
            return models.users[id];
        },
    }
}
;
