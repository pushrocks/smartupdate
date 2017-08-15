import * as plugins from './smartupdate.plugins'

interface ICacheStatus {
  lastCheck
}

class SmartUpdate {
  kvStore = new plugins.npmextra.KeyValueStore('custom', 'global:smartupdate')
  
  async checkCacheStatus () {
    let result: ICacheStatus = await this.kvStore.read(npmname)
    if(result && result) {

    }
  }
  
  async check (npmname: string) {
  }
}
let standardInstance = new SmartUpdate()

export let check = standardInstance.check


export let standardExport = 'Hi there! :) This is a exported string'
