import {User} from '../generated/graphql';

const users: User[] = [
    {
        id: "1",
        name: "shubhamkakkar",
        password: "abc"
    }
];

// const posts = [
//     {id: 1, authorId: 1, title: 'GraphQL'},
//     {id: 2, authorId: 2, title: 'Code'},
//     {id: 3, authorId: 2, title: 'Generator'},
// ];

export const resolvers = {
    Query: {
        allUsers() {
            return users;
        },
    },
    Mutation: {
        login() {
            console.log("in login mutation")
            return users
        }
    }
};


// Author: {
//     posts(author: Author, args: AuthorPostsArgs) {
//
//         return posts.filter(post => post.authorId === author.id);
//     },
// },
// Post: {
//     author(post: Post) {
//         return authors.find(author => author.id === post.author.id);
//     },
// }
