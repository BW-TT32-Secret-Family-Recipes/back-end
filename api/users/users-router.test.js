const request = require("supertest");
const db = require("../../data/db-config");
// const server = require("../users/users-router");
const server = require("../server");

const olaf = { username: "Olaf", password: "summer" };

it("sanity test", async () => {
    expect(3).toBe(3);
});

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db("users").truncate();
});

afterAll(async (done) => {
    await db.destroy();
    done();
});

describe("users router", () => {
    it("gets all users", async () => {
        let res;
        res = await request(server).get("/api/users")
        console.log("RES!", res.body)
    });
});


