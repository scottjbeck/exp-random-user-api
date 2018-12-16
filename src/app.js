import express from "express"
import helmet from "helmet"
import bodyParser from "body-parser"

import packageJSON from "../package.json"
import routes from "./routes"

const app = express()
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => {
	res.status(200).send({
		message: "Welcome",
		project: packageJSON.name,
		version: packageJSON.version
	})
})

routes(app)

export default app
