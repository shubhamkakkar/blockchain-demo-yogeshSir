import { PostsAuthorArgs } from './types';

const authors = [
    { id: 1, firstName: 'Dotan', lastName: 'Simha' },
    { id: 2, firstName: 'David', lastName: 'Yahalomi' },
];

const posts = [
    { id: 1, authorId: 1, title: 'GraphQL' },
    { id: 2, authorId: 2, title: 'Code' },
    { id: 3, authorId: 2, title: 'Generator' },
];

export const resolvers = {
    Query: {
        posts() {
            return posts;
        },
    },
    Author: {
        posts(author, args: PostsAuthorArgs) {

            return posts.filter(post => post.authorId === author.id);
        },
    },
    Post: {
        author(post) {
            return authors.find(author => author.id === post.authorId);
        },
    }
};
