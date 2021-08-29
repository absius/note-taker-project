const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    console.log('p ' +__dirname);
    res.sendFile(path.join(__dirname, '../../index.html'));
  });

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../notes.html'));
  });

  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.post('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });