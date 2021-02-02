const request = require("supertest");
const db = require("../../data/db-config");
const server = require("../server");

const recipe = {
    title: "test",
    category: "test",
    source: "test",
    ingredients: "test",
    instructions: "test"
}

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

describe("recipes router", () => {
    it("cannot get all recipes if not logged in", async () => {
        let res;
        await db("users").insert(olaf)
        await request(server).post("/api/users/1/recipes").send(recipe);
        res = await request(server).get("/api/users/1/recipes")
        expect(res.status).toBe(500)
    });
    it("can get recipe by recipe id", async () => {
        let res;
        let login;
        let recipe;
        await request(server).post("/api/auth/register").send(olaf);
        login = await request(server).post("/api/auth/login").send(olaf);
        recipe = await request(server).post("/api/users/1/recipes").send(recipe);
        res = await request(server).get("/api/users/1/recipes/1").set("authorization", login.body.token);
    });
});
