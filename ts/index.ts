import * as plugins from './smartupdate.plugins';

import { TimeStamp } from '@pushrocks/smarttime';

interface ICacheStatus {
  lastCheck: number;
  latestVersion: string;
  performedUpgrade: boolean;
}

import { KeyValueStore } from '@pushrocks/npmextra';

export class SmartUpdate {
  kvStore = new plugins.npmextra.KeyValueStore('custom', 'global_smartupdate');

  async check(npmnameArg: string, compareVersion: string, changelogUrlArg?: string) {
    // the newData to write
    let timeStamp = new TimeStamp();
    let newData = {
      lastCheck: timeStamp.milliSeconds,
      latestVersion: 'x.x.x',
      performedUpgrade: false
    };

    // the comparison data from the keyValue store
    let result: ICacheStatus = await this.kvStore.readKey(npmnameArg);

    if (result) {
      let lastCheckTimeStamp = TimeStamp.fromMilliSeconds(result.lastCheck);
      let tresholdTime = plugins.smarttime.getMilliSecondsFromUnits({ hours: 1 });
      if (!lastCheckTimeStamp.isOlderThan(timeStamp, tresholdTime)) {
        newData.lastCheck = lastCheckTimeStamp.milliSeconds;
        let nextCheckInMinutes =
          (tresholdTime - (timeStamp.milliSeconds - lastCheckTimeStamp.milliSeconds)) / 60000;
        console.log(
          `next update check in less than ${Math.floor(nextCheckInMinutes) + 1} minute(s): ` +
            `${plugins.consolecolor.coloredString(
              `${npmnameArg} has already been checked within the last hour.`,
              'pink'
            )}`
        );
        return;
      }
    }
    let npmPackage = await this.getNpmPackageFromRegistry(npmnameArg);
    if (!npmPackage) {
      plugins.smartlog.defaultLogger.log('warn', 'failed to retrieve package information...');
      plugins.smartlog.defaultLogger.log('info', 'npms.io might be down');
      return;
    }
    newData.latestVersion = npmPackage.version;
    let upgradeBool = await this.checkIfUpgrade(npmPackage, compareVersion, changelogUrlArg);
    if (upgradeBool) {
      // TODO:
    }
    this.kvStore.writeKey(npmnameArg, newData);
  }

  private async getNpmPackageFromRegistry(npmnameArg): Promise<plugins.smartnpm.NpmPackage> {
    console.log(
      `smartupdate: checking for newer version of ${plugins.consolecolor.coloredString(
        npmnameArg,
        'pink'
      )}...`
    );
    let npmRegistry = new plugins.smartnpm.NpmRegistry();
    let npmPackage: plugins.smartnpm.NpmPackage;
    npmPackage = (await npmRegistry.search({ name: npmnameArg, boostExact: true }))[0];
    return npmPackage;
  }

  private async checkIfUpgrade(
    npmPackage: plugins.smartnpm.NpmPackage,
    localVersionStringArg: string,
    changelogUrlArg?: string
  ) {
    // create Version objects
    let versionNpm = new plugins.smartversion.SmartVersion(npmPackage.version);
    let versionLocal = new plugins.smartversion.SmartVersion(localVersionStringArg);
    if (!versionNpm.greaterThan(versionLocal)) {
      console.log(
        `smartupdate: You are running the latest version of ${plugins.consolecolor.coloredString(
          npmPackage.name,
          'pink'
        )}`
      );
      return false;
    } else {
      plugins.smartlog.defaultLogger.log(
        'warn',
        `There is a newer version of ${npmPackage.name} available on npm.`
      );
      plugins.smartlog.defaultLogger.log(
        'warn',
        `Your version: ${versionLocal.versionString} | version on npm: ${versionNpm.versionString}`
      );
      if (!process.env.CI && changelogUrlArg) {
        console.log('trying to open changelog...');
        plugins.smartopen.openUrl(changelogUrlArg);
      }
      return true;
    }
  }
}
export let standardHandler = new SmartUpdate();
