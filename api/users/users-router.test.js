const request = require("supertest");
const db = require("../../data/db-config");
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
        await db("users").insert(olaf)
        res = await request(server).get("/api/users")
        expect(res.body).toHaveLength(1);
    });
    it("gets user by id", async () => {
        let res;
        await db("users").insert(olaf);
        res = await request(server).get("/api/users/1")
        expect(res.body).toMatchObject({ id: 1, ...olaf })
    });
});


