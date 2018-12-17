import express from "express"
import helmet from "helmet"
import bodyParser from "body-parser"

import packageJSON from "../package.json"
import routes from "./routes"

//standard express setup
const app = express()
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text())
app.use(
	bodyParser.json({
		type: "application/json"
	})
)

app.get("/", (req, res) => {
	res.status(200).send({
		message: "Welcome",
		project: packageJSON.name,
		version: packageJSON.version
	})
})

//add the routes to the app
routes(app)

export default app
