'use strict';

const CoreObject = require('core-object');
const simpleGit = require('simple-git');

const { CI_COMMIT_BRANCH, CI_COMMIT_TAG } = process.env;

module.exports = CoreObject.extend({
  init(path) {
    this._super();
    this.path = path;
  },

  generate() {
    return new Promise(resolve => {
      simpleGit(this.path).log(
        {
          format: {
            hash: '%H',
            date: '%ai',
            commit_message: '%s',
            author_name: '%aN',
            author_email: '%ae'
          }
        },
        function(err, log) {
          if (err) {
            throw err;
          }

          if (!log || !log.latest) {
            resolve();
          } else {
            const info = log.latest;

            resolve({
              sha: info.hash.replace("'", ''),
              email: info.author_email.replace("'", ''),
              name: info.author_name,
              message: info.commit_message,
              timestamp: new Date(info.date).toISOString(),
              branch: CI_COMMIT_BRANCH,
              tag: CI_COMMIT_TAG
            });
          }
        }
      );
    });
  }
});
