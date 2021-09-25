
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
3. The app will be available at http://localhost:8080/
4. Since you already have an Image of the app. Next time you want to start it just run `docker-compose up`
OR
1. Run `npm i` inside the root folder
2. Start Backend: run `npm run serve`
3. Go to **client** folder `cd client` and run `npm i`
4. Start Frontend: run `npm run serve` in the **client** folder

## Project structure

**Main logical entities** are Games, Teams, Rounds, and Users.

#### Backend
Backend is written in Node.js (Express) and it's using MongoDB as a database. Index file is `server.js` in the **root** folder. Here all routes are applied. Routes could be found in the **routes/api** folder. They are divided into 4 logical entities. Every route has its Mongoose schema. All Mongoose models could be found in the **models** folder. Firebase is used for authentication.

#### Frontend
Frontend is written on Vue.js (^2.6), Vuetify as a UI library, and Vuex as a state management library. For routing, we're using Vue Router and Vue Test Utils (based on Jest) for unit tests. Frontend index point is `main.js`. Pages could be found in **views** folder, components are in **components** folder. For structuring components, we're sticking to official Vue [styleguide](https://vuejs.org/v2/style-guide/#Tightly-coupled-component-names-strongly-recommended).
Vuex store is the brain of the app. All API calls are going through VUEX. It's also divided into main 4 entities. All manipulations with the store must go through `actions`, which will call respective `mutations`. [More info](https://vuex.vuejs.org/guide/actions.html) about Vuex actions and mutations.

