const api = require('express').Router();
const fs = require('fs');

const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

api.get('/notes', (req, res) => {
    if(req.method == "GET"){
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
    let getFile = await readFromFile('./db/db.json');
    getFile = JSON.parse(getFile);

    getFile = getFile.filter(x => x.id !== toDelete);
    writeToFile('./db/db.json', getFile);

    res.json(`Note deleted succesfully 🚀`);
});

module.exports = api;