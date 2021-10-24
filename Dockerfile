 # Create image based on the latest node version
FROM node:lts-alpine@sha256:a251de4db0e0632446c0ba62adbe1e37ff148a53732e4574d2ed0f5462cc4407

# Create a directory where our app will be placed
RUN mkdir -p /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY package.json /app

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /app/src

# Change directory to the source
WORKDIR /app/src

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "run", "serve"]
