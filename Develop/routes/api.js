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
    id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added succesfully 🚀`);
} else {
    res.error('Error in adding note');
}
});


api.delete('/notes/:id', (req, res) => {
    console.info(`${req.method} request received to delete a note`);
    
    const toDelete = req.params.id;
    console.log("TO DELETE " + toDelete);
    let getFile =  readFromFile('./db/db.json');
    // delete './db/db.json'[toDelete];
    delete getFile[toDelete];
    console.log(getFile);

    // const removeById = (arr, id) => {
    //     const requiredIndex = arr.findIndex(el => {
    //         return el.id = String(id);
    //     });
    //     if(requiredIndex === -1){
    //         return false;
    //     };
    //     return !!arr.splice(requiredIndex, 1);
    //     };
    //     removeById(getFile, toDelete);
    


        res.json(`Note deleted succesfully 🚀`);
    
});

// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

module.exports = api;