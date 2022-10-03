const {describe, it} = require("mocha");
const request = require("supertest");
const app = require("./api");
const assert = require("assert");

describe("API Suite Test", () =>{
    describe("/login", () => {
        it("Shoud be request the login route and return http status 200", async() => {
            const response = await request(app).get("/login").expect(200);
            assert.deepStrictEqual(response.text, "Login Page")
        })
    })
    describe("/contact", () => {
        it("Shoud be request the contact us route and return http status 200", async() => {
            const response = await request(app).get("/contact").expect(200);
            assert.deepStrictEqual(response.text, "Contact Us Page")
        })
    });
    describe("/default", () => {
        it("Shoud be request the default route and return http status 200", async() => {
            const response = await request(app).get("/default").expect(200);
            assert.deepStrictEqual(response.text, "Not Found")
        })
    })
})