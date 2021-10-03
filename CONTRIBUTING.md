## For contributors:

See the [Planning board](https://github.com/DavidGolodetsky/GeekScore-2/projects/1)

### Requirements

- docker
  OR
- node (preferably >=14)
- npm

### How to contribute?

0. If you're about to work on a particular issue, ask for an assignment to notify other developers that you're working on that
1. Fork the repo
2. Clone your fork to the local machine
3. Create your branch, and a pull request

### How to start up the project?

If you're using docer:

1. Run `cd GeekScore-2/docker`
2. Run `docker-compose up --build`
3. The app will be available at http://localhost:8080/
4. Since you already have an Image of the app. Next time you want to start it just run `docker-compose up`
   OR
5. Run `npm i` inside the root folder
6. Start Backend: run `npm run serve`
7. Go to **client** folder `cd client` and run `npm i`
8. Start Frontend: run `npm run serve` in the **client** folder

## Project structure

**Main logical entities** are Games, Teams, Rounds, and Users.

#### Backend

Backend is written in Node.js (Express) and it's using MongoDB as a database. Index file is `server.js` in the **root** folder. Here all routes are applied. Routes could be found in the **routes/api** folder. They are divided into 4 logical entities. Every route has its Mongoose schema. All Mongoose models could be found in the **models** folder. Firebase is used for authentication.

#### Frontend

Frontend is written on Vue.js (^2.6), Vuetify as a UI library, and Vuex as a state management library. For routing, we're using Vue Router and Vue Test Utils (based on Jest) for unit tests. Frontend index point is `main.js`. Pages could be found in **views** folder, components are in **components** folder. For structuring components, we're sticking to official Vue [styleguide](https://vuejs.org/v2/style-guide/#Tightly-coupled-component-names-strongly-recommended).
Vuex store is the brain of the app. All API calls are going through VUEX. It's also divided into main 4 entities. All manipulations with the store must go through `actions`, which will call respective `mutations`. [More info](https://vuex.vuejs.org/guide/actions.html) about Vuex actions and mutations.
