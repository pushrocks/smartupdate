import { expect, tap } from '@pushrocks/tapbundle';
import * as smartupdate from '../ts/index';

let testSmartUpdate: smartupdate.SmartUpdate;

tap.test('should create an instance of SmartUpdate', async () => {
  testSmartUpdate = new smartupdate.SmartUpdate();
});

tap.test('should check for a npm module', async () => {
  await testSmartUpdate.check('lodash', '1.0.5');
});

tap.start();
