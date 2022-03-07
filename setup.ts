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
    userId: 2,
    subredditId: 1,
    title: "hey",
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
    background: "url",
  },
];
const userSubReddits = [
  {
    userId: 3,
    subredditId: 1,
    dateJoined: 12,
  },
];
const postsLikes = [
  {
    userId: 2,
    postId: 1,
  },
];
const commentUpVotes = [
  {
    userId: 3,
    commentId: 1,
  },
];
const commentDownVotes = [
  {
    userId: 2,
    commentId: 1,
  },
];

db.exec(`
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS subreddits;
DROP TABLE IF EXISTS userSubReddits;
DROP TABLE IF EXISTS postsLikes;
DROP TABLE IF EXISTS comentUpVotes;
DROP TABLE IF EXISTS downVotes;


CREATE TABLE IF NOT EXISTS users (
    id INTEGER,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    displayName TEXT ,
    PRIMARY KEY (id)
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER,
    userId INTEGER,
    subredditId INTEGER,
    title TEXT NOT NULL,
    content TEXT NOT NULL ,
    createdAt TEXT NOT NULL ,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES user(id),
    FOREIGN KEY (subredditId) REFERENCES subreddits(id)
  );
  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER,
    postId INTEGER,
    userId INTEGER,
    content TEXT NOT NULL, 
    upVotes INTEGER,
    downVotes INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (postId) REFERENCES posts(id),
    FOREIGN KEY (userId) REFERENCES users(id)

  );


  CREATE TABLE IF NOT EXISTS subreddits (
    id INTEGER,
    description TEXT NOT NULL,
    background TEXT NOT NULL, 
    PRIMARY KEY (id)
  );


  CREATE TABLE IF NOT EXISTS userSubReddits (
    id INTEGER,
    userId INTEGER,
    subredditId INTEGER,
    dateJoined INTEGER ,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (subredditId) REFERENCES subreddits(id)
  );

  CREATE TABLE IF NOT EXISTS postsLikes (
    id INTEGER,
    userId INTEGER,
    postId INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (postId) REFERENCES posts(id),
    FOREIGN KEY (userId) REFERENCES users(id)

  );

  CREATE TABLE IF NOT EXISTS commentDownVotes (
    id INTEGER,
    userId INTEGER,
    commentId INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (commentId) REFERENCES comments(id)

  );


  CREATE TABLE IF NOT EXISTS commentUpVotes (
    id INTEGER,
    userId INTEGER,
    commentId INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (commentId) REFERENCES comments(id)

  );

 
`);

const createUsers = db.prepare(`
INSERT INTO users(name, email, password, displayName )
VALUES (?,?,?,?,);
`);

const creatPosts = db.prepare(`
INSERT INTO users(userId, subredditId, title, content, createdAt )
VALUES (?,?,?,?,?);
`);

const createComments = db.prepare(`
INSERT INTO users(postId, userId, content, upVotes,downVotes )
VALUES (?,?,?,?,?);
`);

const createSubreddits = db.prepare(`
INSERT INTO users(description, background)
VALUES (?,?);
`);
const createUserSubreddits = db.prepare(`
INSERT INTO users(userId, subredditedId,dateJoined )
VALUES (?,?,?,);
`);

const createPostsLikes = db.prepare(`
INSERT INTO users(userId, postId )
VALUES (?,?,);
`);

const createCommentUpVotes = db.prepare(`
INSERT INTO users(userId,commentId )
VALUES (?,?,);
`);
const createCommentDownVotes = db.prepare(`
INSERT INTO users(userId, commentId )
VALUES (?,?,?,?,);
`);

for (const user of users) {
  createUsers.run(user.name, user.email, user.password, user.displayName);
}

for (const post of posts) {
  creatPosts.run(
    post.userId,
    post.subredditId,
    post.content,
    post.title,
    post.createdAt
  );
}
for (const comment of comments) {
  createComments.run(
    comment.userId,
    comment.postId,
    comment.content,
    comment.upVotes,
    comment.downVotes
  );
}

for (const subreddit of subreddits) {
  createSubreddits.run(subreddit.description, subreddit.background);
}

for (const userSubreddit of userSubReddits) {
  createUserSubreddits.run(
    userSubreddit.userId,
    userSubreddit.subredditId,
    userSubreddit.dateJoined
  );
}

for (const postLike of postsLikes) {
  createPostsLikes.run(postLike.postId, postLike.userId);
}

for (const commentUpVote of commentUpVotes) {
  createCommentUpVotes.run(commentUpVote.userId, commentUpVote.commentId);
}
for (const commentDownVote of commentDownVotes) {
  createCommentDownVotes.run(commentDownVote.userId, commentDownVote.commentId);
}
