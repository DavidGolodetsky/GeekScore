
#  <img src="https://i.ibb.co/gWTjWGK/mstile-144x144.png" width=40> Geek Score

A PWA for board games fans. It allows you to store your games, create teams and collect statistics. Build with MEVN stack.
https://geekscore.herokuapp.com

<img src="https://i.ibb.co/GFyt0c3/Screenshot-at-Sep-19-11-21-40.png" width=240><img src="https://i.ibb.co/c38dqdM/Phone-Screenshot-2.png" width=240>

<img src="https://i.ibb.co/9rqvSrP/Phone-Screenshot-3.png" width=240><img src="https://i.ibb.co/CWrw6vc/Phone-Screenshot-4.png" width=240><img src="https://i.ibb.co/LxyqVmm/Phone-Screenshot-5.png" width=240> 

This is a second version of the app. The first one is up and running [here](http://geekscore.netlify.com/).
Source code of the first version could be found [here](https://github.com/DavidGolodetsky/GeekScore-1).
The main difference for now is that the first version is using Firebase as a backend, while the second version is written with Node.js and Mongo DB. The idea is that both version would exist in the future, but the second one would be continuously  improved, while the first one would be sealed. Here is an [article](https://davidgo.netlify.app/blog/geek-score.html) on my blog if you want to learn more about project's path:)

## For contributors:

### Requirements
* node (preferably >=14)
* npm

### How to contribute?

0. If you're about to work on particular issue, ask for assignment in order to notify other developers that you're working on that.
1. Fork repo
2. Clone your fork
3. Run `cd GeekScore-2/docker` 
4. Run `docker-compose up --build`
6. Create your branch, commit, push, create pull request

## Project structure

**Main logical parts** are Games, Teams, Rounds and Users. Those 4 entities could be find all over the project structure. 

#### Backend
Backend is written in Node.js (Express) and it's using MongoDB as a database (hence MEVN stack). Index file is `server.js` in the **root** folder. Here all routes are applied. Routes could be found in the **routes/api** folder. They are divided by 4 logical entities. Every route has it's Mongoose schema. All Mongoose models could be found in the **models** folder (again they are divided on those 4 entities). Firebase is using only for authentication and it's temprary solution before migrating authentication to node.js.

#### Frontend
Frontend is written on Vue.js (^2.6). We're also using Vuetify as a UI library, and Vuex as state management library. For routing we're using Vue Router and Vue Test Utils (based on Jest) for unit tests. Frontend index point is `main.js`. Pages could be found in **views** folder, components are in **components** folder. For structuring components we're stick to official Vue [styleguide](https://vuejs.org/v2/style-guide/#Tightly-coupled-component-names-strongly-recommended).
Vuex store is the heart of the app. All api calls are going through vuex. It's also divided by main 4 entities. All manipulations with the store must go through `actions`, which will call respective `mutations`. [More info](https://vuex.vuejs.org/guide/actions.html) about Vuex actions and mutations.
 
#### Docker
The App is dockerized. When running the app with Docker, the port can be specified for each service (database, backend, frontend) in the `/docker/.env` file. Also there is a possibility to set the database name, database user and database password.
Before running the docker-compose command a configuration must be done in the `.env` file of `/client/.env`. The `VUE_APP_BACKEND_HOST` variable must be set to the service name of the backend defined in `/docker/docker-compose.yml` file, which is geek-backend.
This must be done before building the Image. After that it can be changed backwards to localhost.

##### Running the App with docker-compose 
In order to run the app with docker-compose the working dir of the cmd must be `/docker` (where the docker-compose file is located)
##### Start and rebuild Images
In order to rebuild the Images before starting the app following command must be typed `docker-compose up --build`
##### Start without rebuild Images
In order to start the docker-compose file just type in following command `docker-compose up`
##### Basic commands for docker-compose 
- `docker-compose stop` -> Stops the whole app containers
- `docker-compose down` -> Stops and removes the whole app containers
- `docker-compose logs` -> Gets the logs of all containers included in the docker-compose file
