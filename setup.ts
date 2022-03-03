import Database from "better-sqlite3";

const db = new Database("./data.db", {
  verbose: console.log,
});

const users = [
  {
    name: "Nicolas",
    email: "nicolas@email.com",
    password: "nicolas",
    displayName: "mvp",
  },
  {
    name: "Ed",
    email: "ed@email.com",
    password: "ed",
    displayName: "poo tans",
  },
  {
    name: "Arita",
    email: "arita@email.com",
    password: "arita",
    displayName: "arrita",
  },
  {
    name: "Rinor",
    email: "rinor@email.com",
    password: "rinor",
    displayName: "rinor",
  },
];

const posts = [
  {
    userID: 2,
    subredditIds: 1,
    tile: "hey",
    content: "gkjgjkf",
    createdAt: "ggg",
  },
];
const comments = [
  {
    postId: 3,
    userId: 1,
    content: "ffffff",
    upVotes: 7,
    downVotes: 4,
  },
];
const subreddits = [
  {
    description: "ffff",
    backgroung: "url",
  },
];
const userSubReddits = [
  {
    userId: 3,
    subredditId: 1,
    datejoined: 12,
  },
];
const postsLikes = [
  {
    userId: 2,
    postId: 1,
  },
];
const comentUpVotes = [
  {
    userId: 3,
    commentID: 1,
  },
];
const commentDownVotes = [
  {
    userId: 2,
    commentId: 1,
  },
];
