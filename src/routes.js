import usersController from "./controllers/users"

const routes = app => {
	app.get("/users", usersController.list)
}

export default routes
