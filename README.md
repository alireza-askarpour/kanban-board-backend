# Kanban Board Backend

The Kanban Board application built using Node.js, Express, Mongoose


## Index
+ [Features](#features)
+ [Installation](#installation)

## Features<a name="features"></a>
+ Uses Express as the application Framework.
+ Authenticates via using [JSON Web Tokens](https://github.com/auth0/node-jsonwebtoken).
+ Uses [MongoDB](https://github.com/mongodb/mongo) and [Mongoose](https://github.com/Automattic/mongoose) for storing and querying data.

## Installation<a name="installation"></a>
### Running Locally
Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

1. Clone or Download the repository

	```
	$ git clone https://github.com/alireza-askarpour/kanban-board-backend.git
	$ cd kanban-board-backend
	```
2. Install Dependencies

	```
	$ npm install
	```

3. configure .env file
    ```
       PORT = 8000

       BASE_URL = http://localhost:8000
       MONGO_URI = mongodb://127.0.0.1:27017/kanban

       SECRET_KEY= a878e7a850c5a3f0fae24530a3f5ca63
    ```
3. Start the application

	```bash
    # development mode
    $ npm run dev

    # production mode
    $ npm start
	```
Your app should now be running on [localhost:8000](http://localhost:8000/).
