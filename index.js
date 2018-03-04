const express = require('express');
const queue = require('./queue');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

// Add an url to parse
app.post('/api/jobs', (request, response) => {
  const { url } = request.body;
  if (!url) {
    return response.status(400).send('No url provided.');
  }

  return queue.addJob('www.google.com')
    .then(({ jobId }) => response.send({ jobId }));
});

// Error middleware
app.use((err, request, response, next) => { // eslint-disable-line no-unused-vars
  console.log(err);
  response.status(500).send('Something went wrong');
});

// Start server
app.listen(port, (err) => {
  if (err) {
    console.log('Something bad happened', err);
  } else {
    console.log(`Server is listening on localhost:${port}`);
  }
});
