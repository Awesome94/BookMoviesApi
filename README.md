### BOOK-MOVIES-API-BE
An API to track and manage booking movies using OMDBAPI as the third-party movie API of choice. 


HTTP |End Point  | Result
--- | --- | ----------
POST | `/v1/register/:username/:password` | Creates a profile/account for new user.
POST | `/v1/login/:username/:password` | Provides user with token to authorize navigation to other endpoints.
POST | `/v1/book` | Takes an object as parameter in body and books movie based on the data/parameters provided in the object and returns identifier.
POST | `/v1/booked/:identifier` | Returns booked movie with corresponding identifier .
GET | `/v1/book/all` | Returns all movies booked by current/given user as derived from the token.
GET | `/v1/download/:identifier` | Streams file matching identifier provided.


## Running Locally.

```sh
git clone https://github.com/Awesome94/BookMoviesApi.git  OR Fork Repo
```
```sh
cd into the project
```

```sh
npm install
```

```sh
npm start
```

```sh

PS: Make sure to have any required env variables in ur .env file. 

```