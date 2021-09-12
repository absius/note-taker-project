const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./db/db.json");
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });

  app.get('/api/notes', (req, res) => {
    return res.json(db);
  });

  app.get('/api/notes/:id', (req, res) => {
    for(let i=0;i<db.length;i++){
      if (db[i].id == req.params.id){
        return res.json(db[i]);

      }
    }
  });

  app.post('/api/notes', (req, res) => {
    req.body.id = db.length + 1;
     db.push(req.body);
     fs.writeFile('./db/db.json', JSON.stringify(db), function(){
      console.log("Added to file");
  });
    res.json(db);
  });

  app.delete('/api/notes/:id', (req, res) => {
    const newArray = db;
    for(let i=0;i<newArray.length;i++){
      if (newArray[i].id == req.params.id){
        newArray.splice(i,1);
      }
    }
    fs.writeFile('./db/db.json', JSON.stringify(newArray), function(){
      console.log("Removed from file");
  });
   res.json(newArray);
 });

  app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });