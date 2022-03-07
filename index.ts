import Database from "better-sqlite3";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database("./data.db", {
  verbose: console.log,
});

const getAllUsers = db.prepare(`
SELECT * FROM users
`);

const getUserById = db.prepare(`
SELECT * FROM users WHERE id=?
`);

const getAllPosts = db.prepare(`
SELECT * FROM posts
`);
const getPostById = db.prepare(`
SELECT * FROM posts WHERE id=?
`);

const getAllComments = db.prepare(`
SELECT * FROM comments
`);
const getCommentById = db.prepare(`
SELECT * FROM comments WHERE id=?
`);
const getAllsubreddits = db.prepare(`
SELECT * FROM subreddits;
`);

const getsubredditById = db.prepare(`
SELECT * FROM subreddits WHERE id=?;
`);

const createUser = db.prepare(`
INSERT INTO users(name,email,password,displayName) VALUES (?,?,?,?);
`);

const createPost = db.prepare(`
INSERT INTO posts (userId,subredditId,content,title, createdAt) VALUES (?,?,?,?,?);
`);

const createComment = db.prepare(`
INSERT INTO comments(postId, userId, content, upVotes,downVotes ) VALUES (?,?,?,?,?);
`);

const createSubreddit = db.prepare(`
INSERT INTO subreddits(description, background ) VALUES (?,?);
`);
const createUserSubreddit = db.prepare(`
INSERT INTO userSubReddits(userId, subredditedId,dateJoined ) VALUES (?,?,?);
`);

const createPostLikes = db.prepare(`
INSERT INTO postsLikes(userId, postId ) VALUES (?,?);
`);

const createCommentUpVotes = db.prepare(`
INSERT INTO commentUpVotes(userId,commentId ) VALUES (?,?);
`);

const createCommentDownVotes = db.prepare(`
INSERT INTO commentDownVotes(userId,commentId ) VALUES (?,?);
`);

const deleteUser = db.prepare(`
DELETE FROM users WHERE id=?;
`);

const updateUser = db.prepare(`
UPDATE users  SET name =?, email=?, password=?, dsiplayName=?, WHERE id =?;
`);

const updatePost = db.prepare(`
UPDATE users  SET userId =?, subredditId=?, content=?, title=?, createdAt=? WHERE id =?;
`);

app.get("/users", (req, res) => {
  const info = getAllUsers.all();

  if (info) {
    res.send(info);
  } else {
    res.status(404).send({ error: "Users not found" });
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const info = getUserById.get(id);

  if (info) {
    res.send(info);
  } else {
    res.status(404).send({ error: "User not found" });
  }
});

app.get("/posts", (req, res) => {
  const info = getAllPosts.all();

  if (info) {
    res.send(info);
  } else {
    res.status(404).send({ error: "Posts not found" });
  }
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const info = getPostById.get(id);

  if (info) {
    res.send(info);
  } else {
    res.status(404).send({ error: "Post not found" });
  }
});

app.get("/comments", (req, res) => {
  const info = getAllComments.all();

  if (info) {
    res.send(info);
  } else {
    res.status(404).send({ error: "Posts not found" });
  }
});

app.get("/comments/:id", (req, res) => {
  const id = req.params.id;
  const info = getCommentById.get(id);

  if (info) {
    res.send(info);
  } else {
    res.status(404).send({ error: "Post not found" });
  }
});

app.get("/subreddits", (req, res) => {
  const info = getAllsubreddits.all();

  if (info) {
    res.send(info);
  } else {
    res.status(404).send({ error: "Posts not found" });
  }
});

app.get("/subreddits/:id", (req, res) => {
  const id = req.params.id;
  const info = getsubredditById.get(id);

  if (info) {
    res.send(info);
  } else {
    res.status(404).send({ error: "Post not found" });
  }
});

app.post("/users", (req, res) => {
  const { name, email, password, displayName } = req.body;
  let errors = [];

  if (typeof name !== "string") errors.push("Username missing or not a string");
  if (typeof email !== "string") errors.push("Email missing or not a string");
  if (typeof password !== "string")
    errors.push("Password missing or not a string");

  if (typeof displayName !== "string")
    errors.push("DisplayName missing or not a string");

  if (errors.length === 0) {
    const info = createUser.run(name, email, password, displayName);

    const newUser = getUserById.run(info.lastInsertRowid);
    res.send(newUser);
  } else {
    res.status(400).send({ error: errors });
  }
});

app.patch("/posts/:id", (req, res) => {
  const id = req.params.id;
  const { userId, subredditId, content, title, createdAt } = req.body;

  const post = getPostById.get(id);

  if (post) {
    updatePost.run(
      userId ?? post.userId,
      subredditId ?? post.subredditedId,
      content ?? post.content,
      title ?? post.title,
      createdAt ?? post.createdAt
    );

    const result = getPostById.get(id);

    res.send(result);
  } else {
    res.status(404).send({ error: "post not found" });
  }
});

app.listen(4000, () => {
  console.log(`server up : http://localhost:4000`);
});
