# Break Time

- Tea Break : 12:00 (15 mins)
- Lunch Break : 01:30 (45 mins)
- Tea Break : 04:00 (15 mins)

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

# Creating GraphQL Server - Steps

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
  > npm run dev:start

# GraphQL Scalar Type - Store single value

- ID
- Int
- String
- Float
- Boolean

# GraphQL Built-in types -

- Query : fetching
- Mutation : Create, Update, Delete
- Subscription : Realtime updates

---

# MongoDB : Mongo Atlas (Cloud)

# Mongo Compass - Mongo GUI Client

# Prisma ORM

# Authenticate - JWT Token

# Mongo Atlas ( Don't use @ sign in username / password)

SRV - mongodb+srv://synergy101:DF7TiDcWkQOn1nss@cluster0.hs6aj9e.mongodb.net/
username - synergy101
pass - DF7TiDcWkQOn1nss

---

- Mongoose ORM for MongDB
- Prisma - prisma.io

# Steps for Prisma & Mongo integration

- npm init -y
- npm install prisma -D
- npx prisma init
- npx prisma db push

- npm install @prisma/client

# Client-side Project using Vite

- npm create vite@latest
- project-name : frontend-javascript
- Vanilla
- JavaScript
- cd frontend-javascript
- npm install
- npm run dev
