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

  async check (npmnameArg: string, compareVersion: string, changelogUrlArg?: string) {
    
    // the newData to write
    let timeStamp = new TimeStamp()
    let newData = {
      lastCheck: timeStamp.milliSeconds,
      latestVersion: 'x.x.x',
      performedUpgrade: false
    }

    // the comparison data from the keyValue store
    let result: ICacheStatus = await this.kvStore.readKey(npmnameArg)

    if (result) {
      let lastCheckTimeStamp = TimeStamp.fromMilliSeconds(result.lastCheck)
      let tresholdTime = plugins.smarttime.getMilliSecondsFromUnits({ hours: 1 })
      if (!lastCheckTimeStamp.isOlderThan(timeStamp, tresholdTime)) {
        newData.lastCheck = lastCheckTimeStamp.milliSeconds
        let nextCheckInMinutes = (tresholdTime - (timeStamp.milliSeconds - lastCheckTimeStamp.milliSeconds)) / 60000
        plugins.beautylog.log(
          `smartupdate: next check in ${Math.round(nextCheckInMinutes)} minutes: ` +
          `${plugins.beautycolor.coloredString(
            `${npmnameArg} has already been checked within the last hour.`
            , 'pink'
          )}`
        )
        return
      }
    }
    let npmPackage = await this.getNpmPackageFromRegistry(npmnameArg)
    newData.latestVersion = npmPackage.version
    let upgradeBool = await this.checkIfUpgrade(npmPackage, compareVersion, changelogUrlArg)
    if (upgradeBool) {
      
    }
    this.kvStore.writeKey(npmnameArg, newData)
  }

  private async getNpmPackageFromRegistry (npmnameArg) {
    plugins.beautylog.log(`smartupdate: checking for newer version of ${plugins.beautycolor.coloredString(npmnameArg, 'pink')}...`)
    let npmRegistry = new plugins.smartnpm.NpmRegistry()
    let npmPackage = (await npmRegistry.search({ name: npmnameArg, boostExact: true }))[0]
    return npmPackage
  }

  private async checkIfUpgrade (
    npmPackage: plugins.smartnpm.NpmPackage,
    localVersionStringArg: string,
    changelogUrlArg?: string
  ) {
    // create Version objects
    let versionNpm = new plugins.smartversion.SmartVersion(npmPackage.version)
    let versionLocal = new plugins.smartversion.SmartVersion(localVersionStringArg)
    if (!versionNpm.greaterThan(versionLocal)) {
      plugins.beautylog.ok(`smartupdate: You are running the latest version of ${plugins.beautycolor.coloredString(npmPackage.name, 'pink')}`)
      return false
    } else {
      plugins.beautylog.warn(`There is a newer version of ${npmPackage.name} available on npm.`)
      plugins.beautylog.warn(`Your version: ${versionLocal.versionString} | version on npm: ${versionNpm.versionString}`)
      if (!process.env.CI && changelogUrlArg) {
        plugins.beautylog.log('trying to open changelog...')
        plugins.smartopen.openUrl(changelogUrlArg)
      }
      return true
    }
  }
}
export let standardHandler = new SmartUpdate()
