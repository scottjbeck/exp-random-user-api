import usersController from "./controllers/users"

const routes = app => {
	app.get("/users", usersController.list)
	app.post("/users", usersController.create)
	app.get("/users/firstname/:firstname", usersController.listByFirstname)
}

export default routes
