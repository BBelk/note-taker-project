const api = require('express').Router();
const fs = require('fs');
const express = require('express');
api.use(express.json());
const {readFromFile, readAndAppend} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

api.get('/notes', (req, res) => {
    if(req.method == "GET"){
        console.log("GETTEM");
        readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    }
    if(req.method == "POST"){
        console.log("POSTEM");
    }

    // console.log(res);
    });

api.post('/notes', (req, res) => {
console.info(`${req.method} request received to add a note`);

const { title, text } = req.body;

if (req.body) {
    const newNote = {
    title,
    text,
    note_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added succesfully 🚀`);
} else {
    res.error('Error in adding note');
}
});

// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

module.exports = api;