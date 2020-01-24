# `ember-cli-deploy` SCM Data Generator for GitLab

This is a tiny utility that provides an alternate [`ember-cli-deploy-revision-data` SCM data generator](https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data#scm-data-generators) that is fit to use in the GitLab CI environment. It is necessary due to an issue in `git-repo-info` where it does not work correctly inside a Docker container (see [rwjblue/git-repo-info#46](https://github.com/rwjblue/git-repo-info/issues/46)).

## Usage

Install the package with

```bash
yarn add -D @movable/ember-cli-deploy-gitlab-scm-data-generator
```

Then configure `ember-cli-deploy-revision-data` to use it:

```javascript
// config/deploy.js

...
ENV["revision-data"] = {
  scm: function(context) {
    return require('@movable/ember-cli-deploy-gitlab-scm-data-generator');
  }
}
...
```
