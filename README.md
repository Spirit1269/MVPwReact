# MVP w React
Minimal Viable Project


Riley Airport Rides is a site for Fort Riley Soldiers and friends and as well as people from the local University to find and give rides to the local airports.  Unfortunatley there is no shuttle service here in the Fort Riley area.  The two big international airports are two hours away.

## Requirements
- Node.js
- Express
- PostgreSQL
- Docker
- React

## Installation
- Clone this repository
- Run npm install
- Create a .env file
- Connect to the Docker container

Use the following code to get started:
- npm init -y 
- npm install dotenv pg express
- touch .env
- touch server.js

## Environment Variables
To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL=postgres://<db-user>:<db-password>@<db-host>/<db-name>`

`PORT=<server-port>`

## Usage
To start the API server, run the following command:

- nodemon server.js
  
This will start the server on the port specified in the .env file.
Once the server is running, you can perform CRUD operations on the patient records by sending HTTP requests to the API endpoints.

The available endpoints are:
- GET /api/person - get all persons records
- GET /api/person/rider - get all riders
- POST /api/person/ - add a new person record
- PATCH /api/person/:id - update an existing person record by ID
- DELETE /api/delete/:id - delete an existing person record by ID
  
## Client

I used React and Bootstrap to create the client side.

## Deployment
To deploy this projectI used VITE:

