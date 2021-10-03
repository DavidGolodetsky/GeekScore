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
