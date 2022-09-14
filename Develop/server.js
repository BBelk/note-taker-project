const express = require('express');
const path = require('path');
const termData = require('./db/db.json');
const PORT = 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });
  
  app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
  );
  
  

// GET request
// app.get('./db/db.json', (req, res) => {
//   // Let the client know that their request was received
//   res.json(`${req.method} request received`);

//   // Show the user agent information in the terminal
//   console.info(req.rawHeaders);

//   // Log our request to the terminal
//   console.info(`${req.method} request received`);
// });

// // POST request
// app.post('/api/reviews', (req, res) => {
//   // Let the client know that their POST request was received
//   res.json(`${req.method} request received`);

//   // Show the user agent information in the terminal
//   console.info(req.rawHeaders);

//   // Log our request to the terminal
//   console.info(`${req.method} request received`);
// });
