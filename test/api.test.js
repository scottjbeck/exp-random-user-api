import request from "supertest"

import app from "../src/app"
console.log(process.env.NODE_ENV)
describe("API testing", () => {
	test("it should respond to the GET method", () => {
		return request(app)
			.get("/")
			.then(response => {
				expect(response.statusCode).toBe(200)
				expect(response.type).toEqual("application/json")
			})
	})
})
