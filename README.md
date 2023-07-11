# **Members only App**

A simple authentication app has built with Node.js and Express.js framework. Express generator has been used to create the skeleton of the project and EJS view engine has been used as templating engine. The app uses [MVC pattern](https://developer.mozilla.org/en-US/docs/Glossary/MVC) and mongoose ODM (Object Document Model). For authenticate the users, passport.js is used. Additionally, in oder to make secure the password, bcrypt.js is used for the project.

The app feature is to let every visitor to view every messages as anonymous post, but only logged in 'club members' can see which messages is posted by which member.
There is also a feature to sign-in into the club as admin, who can moderate (update, remove) the messages, which is not possible to 'normal members'.

### Demo: [Link]()

## Features

-   Create, read, update and delete messages
-   PassportJS is used for authentication
-   BcryptJS is used to secure the password
-   Express validator and Form validator use to validate form values
-   EJS view engine is used to render the DOM
-   MongoDB uses to store data

## How to run from local repository

1. Clone the repository
2. Run `npm install` command in your terminal
3. Create .env file and add a new enviromental variable named MONGODB_URL and paste your own mongoDB connection link
4. Run `npm run start` command in your terminal
5. Server running at `http://localhost:3000/`

### How to populate mongoDB database

-   Run `node populatedb.js <MONGODB_URL>` in your terminal from the project root folder

## Dependencies

-   [Node.js](https://nodejs.org/en)
-   [Express.js](https://expressjs.com/)
-   [express-async-handler](https://www.npmjs.com/package/express-async-handler/)
-   [express-validator](https://www.npmjs.com/package/express-validator)
-   [EJS view engine](https://ejs.co/)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [dotenv](https://www.npmjs.com/package/dotenv)
-   [morgan](https://www.npmjs.com/package/morgan)
-   [http-errors](https://www.npmjs.com/package/http-errors)
-   [date-nfs](https://date-fns.org/)
-   [Passport.js](https://www.passportjs.org/)
-   [bcrypt.js](https://www.npmjs.com/package/bcryptjs)

### Layout

# ![layout picture](https://github.com/ev0clu/express-members-only/blob/main/layout.png?raw=true)
