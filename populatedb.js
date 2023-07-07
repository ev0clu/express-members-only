// #! /usr/bin/env node

console.log(
    'This script populates some test Movies, Directors, Genres and MovieInstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const User = require('./models/User');
const Message = require('./models/Message');

const users = [];
const messages = [];
const images = ['bear', 'fish', 'fox', 'giraffe', 'panda', 'rabbit'];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log('Debug: About to connect');
    await mongoose.connect(mongoDB);
    console.log('Debug: Should be connected?');
    await createUsers();
    await createMessages();
    console.log('Debug: Closing mongoose');
    mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// message[0] will always be the 'Today is a sunny day' message, regardless of the order
// in which the elements of promise.all's argument complete.
async function userCreate(
    index,
    first_name,
    last_name,
    username,
    password,
    member_status,
    admin_status,
    image
) {
    const userDetail = {
        first_name: first_name,
        last_name: last_name,
        username: username,
        password: password,
        member_status: member_status,
        admin_status: admin_status,
        image: image
    };

    const user = new User(userDetail);

    await user.save();
    users[index] = user;
    console.log(`Added user: ${first_name} ${last_name}`);
}

async function messageCreate(index, title, text, createdBy, createdAt) {
    const messageDetail = {
        title: title,
        text: text,
        createdBy: createdBy
    };

    if (createdAt != false) messageDetail.createdAt = createdAt;

    const message = new Message(messageDetail);
    await message.save();
    messages[index] = message;
    console.log(`Added message: ${title}`);
}

async function createUsers() {
    console.log('Adding users');
    await Promise.all([
        userCreate(0, 'Martin', 'Lucas', 'Eagle25', 'wedt45e', false, false, images[3]),
        userCreate(1, 'George', 'Leone', 'leon', 'Hzd&tQe', false, false, images[4]),
        userCreate(2, 'Mona', 'Ansel', 'mineshaft', '3_rdsxo', false, false, images[5])
    ]);
}

async function createMessages() {
    console.log('Adding messages');
    await Promise.all([
        messageCreate(
            0,
            'Today is a sunny day',
            'Today is a sunny day, bringing warmth and brightness. We can head outdoors and enjoy a refreshing walk or engage in outdoor activities together.',
            users[0],
            false
        ),
        messageCreate(
            1,
            'I want to join',
            'This is a really good ide, I want to go with you guys',
            users[1],
            false
        ),
        messageCreate(2, 'Great', 'Anyone else?', users[0], false),
        messageCreate(
            3,
            'Sorry',
            'I cannot join, sorry. Maybe next time. Enjoy it!',
            users[2],
            false
        )
    ]);
}
