it("is the correct env", () => {
    expect(process.env.DB_ENV)
        .toBe("testing")
});

const Users = require("./users-model");
const db = require("../../data/db-config");

const andrew = { username: "andrew", password: "1234" };
const newRecipe = {
    title: "testing",
    category: "dinner",
    source: "mom",
    ingredients: "love",
    instructions: "cook"
};

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db("users").truncate();
    await db("recipes").truncate();
});

afterAll(async (done) => {
    await db.destroy();
    done();
});

describe("users model", () => {
    let recipeRespone = {
        title: "testing",
        category_name: "dinner",
        source_name: "mom",
        ingredients: "love",
        instructions: "cook"
    }
    it("can get all users", async () => {
        let res;
        await db("users").insert(andrew);
        res = await Users.getAll();
        expect(res).toHaveLength(1);
    });
    it("can get user by id", async () => {
        let userById;
        await db("users").insert(andrew);
        user = await Users.getAll();
        idU = await Users.getById(user[0].id)
        expect(idU).toMatchObject({ id: 1, username: "andrew" })
    });
    it("can create a user recipe", async () => {
        let res;
        await db("users").insert(andrew);
        await Users.createUserRecipe(newRecipe, 1);
        res = await Users.getUserRecipes(1)
        expect(res).toMatchObject({ id: 1, username: "andrew", ...recipeRespone })
    });
    it("can get user's recipes by user id", async () => {
        let res;
        await db("users").insert(andrew);
        await Users.createUserRecipe(newRecipe, 1);
        res = await Users.getUserRecipes(1);
        expect(res).toMatchObject({ id: 1, username: "andrew", ...recipeRespone })
    });
});


