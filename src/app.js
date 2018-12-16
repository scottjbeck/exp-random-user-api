import express from "express"

import packageJSON from "../package.json"
import routes from "./routes"

const app = express()

app.get("/", (req, res) => {
	res.status(200).send({
		message: "Welcome",
		project: packageJSON.name,
		version: packageJSON.version
	})
})

routes(app)

export default app
