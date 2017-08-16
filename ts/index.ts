import * as plugins from './smartupdate.plugins'

import { TimeStamp } from 'smarttime'

interface ICacheStatus {
  lastCheck: number
  latestVersion: string
  performedUpgrade: boolean
}

import { KeyValueStore } from 'npmextra'

export class SmartUpdate {
  kvStore = new plugins.npmextra.KeyValueStore('custom', 'global:smartupdate')

  async check (npmnameArg: string, compareVersion: string) {
    let result: ICacheStatus = await this.kvStore.readKey(npmnameArg)
    let timeStamp = new TimeStamp()

    // the newData to write
    let newData = {
      lastCheck: timeStamp.milliSeconds,
      latestVersion: 'x.x.x',
      performedUpgrade: false
    }
    if (result) {
      let lastCheckTimeStamp = TimeStamp.fromMilliSeconds(result.lastCheck)
      let compareTime = plugins.smarttime.getMilliSecondsFromUnits({ days: 1 })
      if (!lastCheckTimeStamp.isOlderThan(timeStamp, compareTime)) {
        plugins.beautylog.log(`smartupdate: next check tomorrow: ${plugins.beautycolor.coloredString(`${npmnameArg} has already been checked for today.`, 'pink')}`)
        return
      }
    }
    let npmPackage = await this.getNpmPackageFromRegistry(npmnameArg)
    newData.latestVersion = npmPackage.version
    let upgradeBool = await this.checkIfUpgrade(npmPackage, compareVersion)
    if(upgradeBool) {
      
    }
    this.kvStore.writeKey(npmnameArg, newData)
  }

  private async getNpmPackageFromRegistry (npmnameArg) {
    plugins.beautylog.log(`smartupdate: checking for newer version of ${plugins.beautycolor.coloredString(npmnameArg, 'pink')}...`)
    let npmRegistry = new plugins.smartnpm.NpmRegistry()
    let npmPackage = (await npmRegistry.search({ name: npmnameArg, boostExact: true }))[0]
    return npmPackage
  }

  private async checkIfUpgrade (npmPackage: plugins.smartnpm.NpmPackage, versionArg: string) {
    if (npmPackage.version === versionArg) {
      plugins.beautylog.ok(`smartupdate: You are running the latest version of ${plugins.beautycolor.coloredString(npmPackage.name, 'pink')}`)
      return false
    } else {
      plugins.beautylog.warn(`There is a newer version of ${npmPackage.name} available on npm.`)
      plugins.beautylog.info(`Your version: ${versionArg} | version on npm: ${npmPackage.version}`)
      plugins.beautylog.warn(`!!! You should upgrade!!!`)
      return true
    }
  }
}
export let standardHandler = new SmartUpdate()
