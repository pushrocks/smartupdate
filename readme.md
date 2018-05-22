# smartupdate

update your tools in a smart way

## Availabililty

[![npm](https://pushrocks.gitlab.io/assets/repo-button-npm.svg)](https://www.npmjs.com/package/smartupdate)
[![git](https://pushrocks.gitlab.io/assets/repo-button-git.svg)](https://GitLab.com/pushrocks/smartupdate)
[![git](https://pushrocks.gitlab.io/assets/repo-button-mirror.svg)](https://github.com/pushrocks/smartupdate)
[![docs](https://pushrocks.gitlab.io/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/smartupdate/)

## Status for master

[![build status](https://GitLab.com/pushrocks/smartupdate/badges/master/build.svg)](https://GitLab.com/pushrocks/smartupdate/commits/master)
[![coverage report](https://GitLab.com/pushrocks/smartupdate/badges/master/coverage.svg)](https://GitLab.com/pushrocks/smartupdate/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/smartupdate.svg)](https://www.npmjs.com/package/smartupdate)
[![Dependency Status](https://david-dm.org/pushrocks/smartupdate.svg)](https://david-dm.org/pushrocks/smartupdate)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/smartupdate/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/smartupdate/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/smartupdate/badges/code.svg)](https://www.bithound.io/github/pushrocks/smartupdate)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Usage

Use TypeScript for best in class instellisense.

smartupdate makes it really easy to notify your tool users about new versions:

```typescript
import * as smartupdate from 'smartupdate';

// the following command will check npm for a version newer than the specified one.
// It will open the specified URL if a newer version is actually found.
await smartupdate.standardHandler.check(
  'lodash',
  '1.0.5',
  'http://gitzone.gitlab.io/npmts/changelog.html'
);
```

For further information read the linked docs at the top of this README.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
> | By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy.html)

[![repo-footer](https://pushrocks.gitlab.io/assets/repo-footer.svg)](https://push.rocks)
