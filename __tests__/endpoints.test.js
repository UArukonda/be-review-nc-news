const request = require("supertest");
const data = require("../db/data/test-data/index.js");
const app = require("../db/app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("/api/topics", () => {
  test("200: return all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics[0]).toMatchObject({
          slug: expect.any(String),
          description: expect.any(String),
        });
      });
  });
  test("404: return 'Not Found' when bad url is requested", () => {
    return request(app)
      .get("/api/tipics")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});
