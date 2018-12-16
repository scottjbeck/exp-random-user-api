import usersController from "./controllers/users"

const routes = app => {
	app.get("/users", usersController.list)
	app.post('/users', usersController.create)
}

export default routes
