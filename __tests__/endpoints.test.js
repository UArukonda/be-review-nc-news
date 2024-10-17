const request = require("supertest");
const data = require("../db/data/test-data/index.js");
const app = require("../db/app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const endpoints = require("../endpoints.json");
const { toBeSortedBy } = require("jest-sorted");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET: /api/topics", () => {
  test("GET: 200 - return all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        for (const topic of body.topics) {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        }
      });
  });
});

describe("GET: /api", () => {
  test("GET: 200 - respond with object detailing all available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.endpoints).toEqual(endpoints);
      });
  });
});

describe("GET: /api/articles/:article_id", () => {
  test("GET: 200 respond with the corresponding article object", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.article.article_id).toBe(1);
        expect(body.article).toMatchObject({
          article_id: expect.any(Number),
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
        });
      });
  });
  test("GET: 400 responds with an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/not-a-number")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("GET: 404 responds with an appropriate status and error message when given a non-existent id", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Id Not Found");
      });
  });
});

describe("GET: /api/articles", () => {
  test("GET: 200 respond with the array of article objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        for (const article of body.articles) {
          expect(article).toMatchObject({
            article_id: expect.any(Number),
            title: expect.any(String),
            topic: expect.any(String),
            author: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number),
          });
        }
      });
  });
  test("GET: 200 return articles sorted by given query(date)", () => {
    return request(app)
      .get("/api/articles?sort_by=created_at")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSortedBy("created_at", {
          ascending: false,
          coerce: true,
        });
      });
  });
});

describe("GET: /api/articles/:article_id/comments", () => {
  test("GET: 200 respond with all the comments associated to the given article id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        for (const comment of body.comments) {
          expect(comment.article_id).toBe(1);
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            article_id: expect.any(Number),
            body: expect.any(String),
            created_at: expect.any(String),
            author: expect.any(String),
          });
        }
      });
  });

  test("GET: 200 respond with empty array when there are no comments associated to article", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });

  test("GET: 400 responds with an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/not-a-number/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("GET: 404 responds with an appropriate status and error message when given a non-existent id", () => {
    return request(app)
      .get("/api/articles/999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Id Not Found");
      });
  });
});

describe("POST: /api/articles/:article_id/comments", () => {
  test("POST: 200 responds with the comment added for an article", () => {
    return request(app)
      .post("/api/articles/5/comments")
      .send({ username: "icellusedkars", comment: "good one" })
      .expect(201)
      .then(({ body }) => {
        expect(body.insertedComment).toMatchObject({
          comment_id: expect.any(Number),
          votes: expect.any(Number),
          article_id: expect.any(Number),
          body: expect.any(String),
          created_at: expect.any(String),
          author: expect.any(String),
        });
      });
  });

  test("check if insertion is successful", () => {
    return request(app)
      .post("/api/articles/5/comments")
      .send({ username: "icellusedkars", comment: "good one" })
      .expect(201)
      .then(({ body }) => {
        expect(body.insertedComment).toMatchObject({
          comment_id: expect.any(Number),
          votes: expect.any(Number),
          article_id: 5,
          body: "good one",
          created_at: expect.any(String),
          author: "icellusedkars",
        });
      });
  });

  test("POST: 400 responds with an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .post("/api/articles/not-a-number/comments")
      .send({ username: "icellusedkars", comment: "good one" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });

  test("POST: 404 responds with an appropriate status and error message when given a non-existent id", () => {
    return request(app)
      .post("/api/articles/999/comments")
      .send({ username: "icellusedkars", comment: "good one" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Id Not Found(foreign key constraint violated)");
      });
  });

  test("POST: 400 missing user name", () => {
    return request(app)
      .post("/api/articles/5/comments")
      .send({ comment: "good one" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("missing username to insert");
      });
  });

  test("POST: 404 username does not exist", () => {
    return request(app)
      .post("/api/articles/5/comments")
      .send({ username: "abc", comment: "good one" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("username does not exist");
      });
  });
});

describe("GET: 400 responds with appropriate error message when given invalid URLs", () => {
  test("GET: 404 - return 'Not Found' when bad url is requested", () => {
    return request(app)
      .get("/api/tipics")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});
