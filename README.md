# exp-random-user-api
Example Project for Random User API

## Project Specification
Create Express based API exposing 3 endpoints:
- GET /users
	- retrieves 10 new users from 'https://randomuser.me/api'
	- stores the users in memory
	- RESPONSE:
		- 200
		- list of all users in memory
- POST /users
	- store posted data in memory
	- ASSUMPTION: will be stored separately from random user api request, project spec unclear if these are to be cleared when those are retrieved
	- RESPONSE:
		- 201
		- message: User successfully created!
- GET /users/firstname/:firstname
	- filters users in memory
	- RESPONSE if found:
		- 200
		- filtered list of users
	- RESPONSE if not found:
		- 404
		- message: User not found!

