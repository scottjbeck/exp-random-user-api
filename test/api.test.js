import request from "supertest"

import app from "../src/app"

const state = {}

describe("API testing", () => {
	test("it should respond to the GET method", () => {
		return request(app)
			.get("/")
			.then(response => {
				expect(response.statusCode).toBe(200)
				expect(response.type).toEqual("application/json")
			})
	})

	test("GET /users should return 10 users", () => {
		return request(app)
			.get("/users")
			.then(response => {
				expect(response.statusCode).toBe(200)
				expect(response.type).toEqual("application/json")
				expect(response.body.users.length).toBe(10)

				// save these results for future tests
				state.usersGet1 = response.body.users
			})
	})

	test("GET /users should return 10 different users", () => {
		return request(app)
			.get("/users")
			.then(response => {
				const users1 = JSON.stringify(state.usersGet1)
				const users2 = JSON.stringify(response.body.users)
				//using strinfigy, assumes that would be hard to randomly retrieve the exact 10 twice
				expect(users1).not.toEqual(users2)
			})
	})

	test("POST /users should create new user", () => {
		return request(app)
			.post("/users")
			.send({
				gender: "male",
				firstname: "bar",
				city: "baz",
				email: "someting@example.com",
				cell: "1-800-555-5555"
			})
			.then(response => {
				expect(response.statusCode).toBe(201)
			})
	})

	test("POST /users should fail to create with missing property", () => {
		return request(app)
			.post("/users")
			.send({
				gender: "male",
				firstname: "",
				city: "baz",
				email: "someting@example.com",
				cell: "1-800-555-5555"
			})
			.then(response => {
				expect(response.statusCode).toBe(400)
			})
	})
})
