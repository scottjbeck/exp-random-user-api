const store = {}

store.users = []
store.usersPosted = []

store.usersAll = () => {
	return store.users.concat(store.usersPosted)
}

export default store
