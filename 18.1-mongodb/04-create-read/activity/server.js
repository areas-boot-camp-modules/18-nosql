// Dependencies.
const express = require('express');
const mongodb = require('mongodb').MongoClient;

// App.
const app = express();
const port = 3001;

// MongoDB.
const connectionStringURI = `mongodb://127.0.0.1:27017/inventoryDB`;

let db;

mongodb.connect(
  connectionStringURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    db = client.db();
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }
);

// Middleware.
app.use(express.json());

// POST /create (addBook).
app.post('/create', (req, res) => {
  db.collection('bookCollection').insertOne(
    { title: req.body.title, author: req.body.author },
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// POST /create-many (addBooks).
app.post('/create-many', function (req, res) {
  db.collection('bookCollection').insertMany(
    [
      {"title" : "Oh the Places We Will Go!"},
      {"title" : "Diary of Anne Frank"}
    ], 
    (err,results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// GET /read (getBooks)
app.get('/read', (req, res) => {
  db.collection('bookCollection')
    .find({})
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
});
