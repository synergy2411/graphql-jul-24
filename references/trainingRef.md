# NodeJS Installer

- Node Runtime Environment - NRE
- Node Package Manager - NPM
- Node Native Modules - http, os, fs, events, utils

- NodeJS : Server-side scripts
- Browser : Client-side scripts

# Blog App

- /posts - id, title, body
- /authors - id, name, age

Client App -> title, body, name (author)

- id, title, body
- id, name, age

- Over-fetching : fetch more data than required in App
- Under-fetching : fetching less data than required in App

query {
title,
body,
author : {
name
}
}

---

- Create NodeJS Project
- Generate package.json file
  > npm init -y
- Install dependencies
  > npm install graphql-yoga graphql
- Setup the environment
  > npm install nodemon -D
  > changes in package.json
  - "type" : "module"
  - "dev:start" : "nodemon ./src/server.js"
- Configure Yoga Server
