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



