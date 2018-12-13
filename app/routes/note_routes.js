var ObjectId = require('mongodb').ObjectId;

module.exports = function(app, client) {
  const db = client.db('saperdb');
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectId(id) };
    db.collection('notes').findOne(details, (err, item) => {
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
    db.collection('notes').deleteOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occured' });
      } else {
        res.send(`Note ${id} delete`);
      }
    });
  });

  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insertOne(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occured' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
