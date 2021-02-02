it("is the correct env", () => {
    expect(process.env.DB_ENV)
        .toBe("testing")
});

const Users = require("./users-model");
const db = require("../../data/db-config");

const andrew = { username: "andrew", password: "1234" };

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db('users').truncate();
});

afterAll(async (done) => {
    await db.destroy();
    done();
});

describe("users model", () => {
    it("inserts a user", async () => {
        let user;
        await Users.insert(andrew);
        user = await db("users");
        expect(user).toHaveLength(1);
    });
    it("can get user by id", async () => {
        let userById;
        await db("users").insert(andrew);
        user = await Users.getAll();
        idU = await Users.getById(user[0].id)
        expect(idU).toMatchObject({ id: 1, username: "andrew" })
    });
});


