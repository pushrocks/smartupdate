import { expect, tap } from '@pushrocks/tapbundle';
import * as smartupdate from '../ts/index';

tap.test('should check for a npm module', async () => {
  await smartupdate.standardHandler.check('lodash', '1.0.5');
});

tap.start();
