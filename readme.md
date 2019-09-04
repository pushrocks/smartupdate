# @pushrocks/smartupdate
update your tools in a smart way

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@pushrocks/smartupdate)
* [gitlab.com (source)](https://gitlab.com/pushrocks/smartupdate)
* [github.com (source mirror)](https://github.com/pushrocks/smartupdate)
* [docs (typedoc)](https://pushrocks.gitlab.io/smartupdate/)

## Status for master
[![build status](https://gitlab.com/pushrocks/smartupdate/badges/master/build.svg)](https://gitlab.com/pushrocks/smartupdate/commits/master)
[![coverage report](https://gitlab.com/pushrocks/smartupdate/badges/master/coverage.svg)](https://gitlab.com/pushrocks/smartupdate/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/@pushrocks/smartupdate.svg)](https://www.npmjs.com/package/@pushrocks/smartupdate)
[![Known Vulnerabilities](https://snyk.io/test/npm/@pushrocks/smartupdate/badge.svg)](https://snyk.io/test/npm/@pushrocks/smartupdate)
[![TypeScript](https://img.shields.io/badge/TypeScript->=%203.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

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

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy)

[![repo-footer](https://lossless.gitlab.io/publicrelations/repofooter.svg)](https://maintainedby.lossless.com)
