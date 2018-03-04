const express = require('express');

const app = express();
const port = 3000;

app.post('/jobs', (request, response) => {
  response.send('All good');
});

app.use((err, request, response, next) => { // eslint-disable-line no-unused-vars
  console.log(err);
  response.status(500).send('Something went wrong');
});

app.listen(port, (err) => {
  if (err) {
    console.log('Something bad happened', err);
  } else {
    console.log(`Server is listening on localhost:${port}`);
  }
});
