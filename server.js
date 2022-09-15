const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

const apiRoute = require('./routes/api.js');
app.use('/api', apiRoute);

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = process.env.PORT || 3001;

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
  
  app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
  );