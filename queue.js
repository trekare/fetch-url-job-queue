const kue = require('kue');
const Promise = require('bluebird');

Promise.promisifyAll(kue.Job.prototype);

const jobs = kue.createQueue();

function addJob(url) {
  const job = jobs.create('fetch url', { url });

  job.on('complete', () => {
    console.log(`Job ${job.id} with url ${job.data.url} is done`);
  });

  job.on('failed', () => {
    console.log(`Job ${job.id} with url ${job.data.url} failed`);
  });

  return job.saveAsync().then(() => ({ jobId: job.id }));
}

// Starts the procecess
jobs.process('fetch url', (job, done) => {
  if (done) {
    done();
  }
});

module.exports = {
  addJob,
};
