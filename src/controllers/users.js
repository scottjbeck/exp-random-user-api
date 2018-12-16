import axios from "axios"
import JoiBase from "joi"
const Joi = JoiBase.extend(require("joi-phone-number"))

import store from "../store"

const DEFAULTS = {
	RANDOMUSER_API: "https://randomuser.me/api",
	RANDOMUSER_QUANTITY: 10
}

const usersController = {}

// create user from posted data
usersController.create = async (req, res, next) => {
	const userSchema = Joi.object().keys({
		gender: Joi.string()
			.trim()
			.regex(/^(male|female|other)$/)
			.required(),
		firstname: Joi.string().required(),
		city: Joi.string().required(),
		email: Joi.string()
			.email()
			.required(),
		cell: Joi.string()
			.phoneNumber()
			.required()
	})

	const result = Joi.validate(req.body, userSchema)

	if (result.error) {
		return res
			.status(400)
			.send({ message: "Error validating data.", error: result.error })
	}

	const user = {
		gender: req.body.gender,
		firstname: req.body.firstname,
		city: req.body.city,
		email: req.body.email,
		cell: req.body.cell
	}

	store.usersPosted.push(user)

	res.status(201).send({ message: "User successfully created!", user })
}

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
