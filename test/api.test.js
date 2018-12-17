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
				state.usersGet = response.body.users
			})
	})

	test("GET /users should return 10 different users", () => {
		return request(app)
			.get("/users")
			.then(response => {
				const users1 = JSON.stringify(state.usersGet)
				const users2 = JSON.stringify(response.body.users)
				//using strinfigy, assumes that would be hard to randomly retrieve the exact 10 twice
				expect(users1).not.toEqual(users2)

				//update local state for future tests
				state.usersGet = response.body.users
			})
	})

	test("POST /users should create new user", () => {
		return request(app)
			.post("/users")
			.send({
				gender: "male",
				firstname: "PostedNameFirst",
				city: "baz",
				email: "someting@example.com",
				cell: "1-800-555-5555"
			})
			.then(response => {
				expect(response.statusCode).toBe(201)
				expect(response.body.message).toBe("User successfully created!")

				state.usersPosted = response.body.user
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
				expect(response.body.message).toBe("Error validating data.")
			})
	})

	test("GET /user/:firstname should return matching users", () => {
		// use firstname from first user retrieved in previous test
		const testname = state.usersGet[0].firstname

		return request(app)
			.get("/users/firstname/" + testname)
			.then(response => {
				expect(response.statusCode).toBe(200)
			})
	})

	test("GET /user/:firstname should return matched POSTED user", () => {
		return request(app)
			.get("/users/firstname/" + state.usersPosted.firstname)
			.then(response => {
				expect(response.statusCode).toBe(200)
				expect(response.body.users.length).toBe(1)
			})
	})

	test("GET /user/:firstname should return error for invalid name", () => {
		return request(app)
			.get("/users/firstname/" + "___________________")
			.then(response => {
				expect(response.statusCode).toBe(404)
				expect(response.body.message).toBe("User not found!")
			})
	})
})
