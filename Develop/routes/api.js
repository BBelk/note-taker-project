const api = require('express').Router();
const fs = require('fs');
const express = require('express');
api.use(express.json());
const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const { json } = require('express');

api.get('/notes', (req, res) => {
    if(req.method == "GET"){
        // console.log("GETTEM");
        readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    }
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


api.delete('/notes/:id', async (req, res) => {
    console.info(`${req.method} request received to delete a note`);
    
    const toDelete = req.params.id;
    console.log("TO DELETE " + toDelete);
    let getFile = await readFromFile('./db/db.json');
    getFile = JSON.parse(getFile);

    getFile = getFile.filter(x => x.id !== toDelete);

    // delete getFile[toDelete];
    console.log(getFile);
    writeToFile('./db/db.json', getFile);
    // console.log(getFile2);

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