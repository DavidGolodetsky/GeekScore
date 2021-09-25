
#  <img src="https://i.ibb.co/gWTjWGK/mstile-144x144.png" width=40> Geek Score

A PWA for board games fans. It allows you to store your games, creates teams, and collect statistics. 

Check out the first stable version: https://geekscore.netlify.app

<img src="https://i.ibb.co/GFyt0c3/Screenshot-at-Sep-19-11-21-40.png" width=240><img src="https://i.ibb.co/c38dqdM/Phone-Screenshot-2.png" width=240>

<img src="https://i.ibb.co/9rqvSrP/Phone-Screenshot-3.png" width=240><img src="https://i.ibb.co/CWrw6vc/Phone-Screenshot-4.png" width=240><img src="https://i.ibb.co/LxyqVmm/Phone-Screenshot-5.png" width=240> 

This is the second version of the app, build with MEVN stack, vue-composition-api, and Typescript. The first one was using Firebase as a backend.
(If you want to learn more about the project's path here is an [article](https://davidgo.netlify.app/blog/geek-score.html) on my blog)

## For contributors:

See the [Planning board](https://github.com/DavidGolodetsky/GeekScore-2/projects/1)

### Requirements
* docker
OR
* node (preferably >=14)
* npm

### How to contribute?

0. If you're about to work on a particular issue, ask for an assignment to notify other developers that you're working on that
1. Fork the repo
2. Clone your fork to the local machine
3. Create your branch, and a pull request

### How to start up the project?
If you're using docer:
1. Run `cd GeekScore-2/docker` 
2. Run `docker-compose up --build`
3. The app will be running at http://localhost:8080/

## Project structure

**Main logical parts** are Games, Teams, Rounds, and Users.

#### Backend
Backend is written in Node.js (Express) and it's using MongoDB as a database. Index file is `server.js` in the **root** folder. Here all routes are applied. Routes could be found in the **routes/api** folder. They are divided into 4 logical entities. Every route has its Mongoose schema. All Mongoose models could be found in the **models** folder (again they are divided into those 4 entities). Firebase is using only for authentication and it's temporary solution before migrating authentication to node.js.

#### Frontend
Frontend is written on Vue.js (^2.6). We're also using Vuetify as a UI library, and Vuex as a state management library. For routing, we're using Vue Router and Vue Test Utils (based on Jest) for unit tests. Frontend index point is `main.js`. Pages could be found in **views** folder, components are in **components** folder. For structuring components, we're sticking to official Vue [styleguide](https://vuejs.org/v2/style-guide/#Tightly-coupled-component-names-strongly-recommended).
Vuex store is the heart of the app. All API calls are going through VUEX. It's also divided into main 4 entities. All manipulations with the store must go through `actions`, which will call respective `mutations`. [More info](https://vuex.vuejs.org/guide/actions.html) about Vuex actions and mutations.
 
#### Docker
The App is dockerized. When running the app with Docker, the port can be specified for each service (database, backend, frontend) in the `/docker/.env` file. Also, there is a possibility to set the database name, database user, and database password.
Before running the docker-compose command a configuration must be done in the `.env` file of `/client/.env`. The `VUE_APP_BACKEND_HOST` variable must be set to the service name of the backend defined in `/docker/docker-compose.yml` file, which is geek-backend.
This must be done before building the Image. After that, it can be changed back to localhost.

##### Running the App with docker-compose 
To run the app with docker-compose, the working dir of the cmd must be `/docker` (where the docker-compose file is located)
##### Start and rebuild Images
To rebuild the Images before starting the app following command must be typed `docker-compose up --build`
##### Start without rebuild Images
To start the docker-compose file just type in the following command `docker-compose up`
##### Basic commands for docker-compose 
- `docker-compose stop` -> Stops the whole app containers
- `docker-compose down` -> Stops and removes the whole app containers
- `docker-compose logs` -> Gets the logs of all containers included in the docker-compose file
