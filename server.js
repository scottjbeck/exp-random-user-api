import express from "express"
import packageJSON from "./package.json"

const app = express()

app.get("/", (req, res) => {
	res.status(200).send({
		message: "Welcome",
		project: packageJSON.name,
		version: packageJSON.version
	})
})

app.listen(3000)
