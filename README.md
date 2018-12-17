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
	- ASSUMPTION: data will be provided in the same object format as to be stored
		- gender, firstname, city, email, cell
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

## Running application
- Application will run on a default port of 3000: `http://localhost:3000`
- Development:
	- `yarn dev`
	- will run the express server with nodemon for automatic reloading of changes
- Production:
	- `yarn build`
	- creates a new produciton compiled server resource in `/build` directory
	- `yarn prod`
	- runs the production build with raw node service

## Testing
- `yarn test`
	- runs jest test suite to validate the requirements

## Notes
- future enhancements:
	- use autocannon for optimization
	- likely switch from express if speed is of concern
	- split out data models when more schemas are present
	- decouple route handling form controllers