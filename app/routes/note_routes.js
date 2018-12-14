var ObjectId = require('mongodb').ObjectId;
var  test = require('assert');


module.exports = function(app, client) {
  const db = client.db('saperdb');
  const notes = db.collection('notes');

  app.get('/notes/all', (req, res) => {
        notes.find().toArray(function(err, docs) {
        //  test.equal(null, err);
        //  test.equal(4, docs.length);
          if (err) {
            res.send({ 'error': 'An error has occured'});
          } else {
            res.send(docs);
          }
        });
    });


  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectId(id) };
    notes.findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occured'});
      } else {
        res.send(item);
      }
    });
  });

  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectId(id) };
    notes.deleteOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occured' });
      } else {
        res.send(`Note ${id} delete`);
      }
    });
  });

  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    notes.insertOne(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occured' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectId(id) };
    const note = { text: req.body.body, title: req.body.title };
    notes.updateOne(details, note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occured' });
      } else {
        res.send(note);
      }
    });
  });
};
