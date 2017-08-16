import { expect, tap } from 'tapbundle'
import * as smartupdate from '../ts/index'

tap.test('should check for a npm module', async () => {
  await smartupdate.standardHandler.check('npmts', '8.0.5')
})

tap.start()
