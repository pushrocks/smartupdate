import * as plugins from './smartupdate.plugins';

import { TimeStamp } from '@pushrocks/smarttime';

interface ICacheStatus {
  lastCheck: number;
  latestVersion: string;
  performedUpgrade: boolean;
}

import { KeyValueStore } from '@pushrocks/npmextra';

export class SmartUpdate {
  public npmRegistry: plugins.smartnpm.NpmRegistry;
  public kvStore = new plugins.npmextra.KeyValueStore('custom', 'global_smartupdate');

  constructor(optionsArg: plugins.smartnpm.INpmRegistryConstructorOptions = {}) {
    this.npmRegistry = new plugins.smartnpm.NpmRegistry(optionsArg);
  }

  public async checkForCli(npmnameArg: string, compareVersion: string, changelogUrlArg?: string) {
    // the newData to write
    const timeStamp = new TimeStamp();
    const newCacheData: ICacheStatus = {
      lastCheck: timeStamp.milliSeconds,
      latestVersion: 'x.x.x',
      performedUpgrade: false
    };

    // the comparison data from the keyValue store
    const retrievedCacheData: ICacheStatus = await this.kvStore.readKey(npmnameArg);

    if (retrievedCacheData) {
      const lastCheckTimeStamp = TimeStamp.fromMilliSeconds(retrievedCacheData.lastCheck);
      const tresholdTime = plugins.smarttime.getMilliSecondsFromUnits({ hours: 1 });
      if (!lastCheckTimeStamp.isOlderThan(timeStamp, tresholdTime)) {
        newCacheData.lastCheck = lastCheckTimeStamp.milliSeconds;
        const nextCheckInMinutes =
          (tresholdTime - (timeStamp.milliSeconds - lastCheckTimeStamp.milliSeconds)) / 60000;
        console.log(
          `next update check in less than ${Math.floor(nextCheckInMinutes) + 1} minute(s): ` +
            `${plugins.consolecolor.coloredString(
              `${npmnameArg} has already been checked within the last hour.`,
              'pink'
            )}`
        );
        return false; // don't upgrade if checked within reasonable time
      }
    }

    const upgradeBool = await this.check(npmnameArg, compareVersion, changelogUrlArg);
    if (upgradeBool) {
      const npmPackage = await this.npmRegistry.getPackageInfo(npmnameArg);
      newCacheData.latestVersion = npmPackage.version;
      this.kvStore.writeKey(npmnameArg, newCacheData);
    }
    
    return upgradeBool;
  }

  private async getNpmPackageFromRegistry(npmnameArg): Promise<plugins.smartnpm.NpmPackage> {
    console.log(
      `smartupdate: checking for newer version of ${plugins.consolecolor.coloredString(
        npmnameArg,
        'pink'
      )}...`
    );
    const npmPackage = this.npmRegistry.getPackageInfo(npmnameArg);
    return npmPackage;
  }

  public async check(
    npmPackageName: string,
    localVersionStringArg: string,
    changelogUrlArg?: string
  ) {
    const npmPackage = await this.getNpmPackageFromRegistry(npmPackageName);
    if (!npmPackage) {
      console.log('warn: failed to retrieve package information...');
      console.log('info: is the registry down?');
      return;
    }

    // create Version objects
    const versionNpm = new plugins.smartversion.SmartVersion(npmPackage.version);
    const versionLocal = new plugins.smartversion.SmartVersion(localVersionStringArg);
    if (!versionNpm.greaterThan(versionLocal)) {
      console.log(
        `smartupdate: You are running the latest version of ${plugins.consolecolor.coloredString(
          npmPackage.name,
          'pink'
        )}`
      );
      return false;
    } else {
      console.log(
        `warn: There is a newer version of ${npmPackage.name} available on npm.`
      );
      console.log(
        `warn: Your version: ${versionLocal.versionString} | version on npm: ${versionNpm.versionString}`
      );
      if (!process.env.CI && changelogUrlArg) {
        console.log('trying to open changelog...');
        plugins.smartopen.openUrl(changelogUrlArg);
      }
      return true;
    }
  }
}
