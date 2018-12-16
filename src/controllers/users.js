import axios from "axios"

import store from "../store"

const DEFAULTS = {
	RANDOMUSER_API: "https://randomuser.me/api",
	RANDOMUSER_QUANTITY: 10
}

const usersController = {}

// list method
// retrieves configured amount of new users from api
usersController.list = async (req, res, next) => {
	let requests = []

	for (let i = 0; i < DEFAULTS.RANDOMUSER_QUANTITY; i++) {
		requests.push(axios.get(DEFAULTS.RANDOMUSER_API))
	}

	const responses = await Promise.all(requests)

	const users = responses.map(user => {
		const data = user.data.results[0]

		return {
			gender: data.gender,
			firstname: data.name.first,
			city: data.location.city,
			email: data.email,
			cell: data.cell
		}
	})

	store.users = users

	res.status(200).send({ users })
}

export default usersController
