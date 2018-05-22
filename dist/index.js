"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartupdate.plugins");
const smarttime_1 = require("smarttime");
class SmartUpdate {
    constructor() {
        this.kvStore = new plugins.npmextra.KeyValueStore('custom', 'global_smartupdate');
    }
    check(npmnameArg, compareVersion, changelogUrlArg) {
        return __awaiter(this, void 0, void 0, function* () {
            // the newData to write
            let timeStamp = new smarttime_1.TimeStamp();
            let newData = {
                lastCheck: timeStamp.milliSeconds,
                latestVersion: 'x.x.x',
                performedUpgrade: false
            };
            // the comparison data from the keyValue store
            let result = yield this.kvStore.readKey(npmnameArg);
            if (result) {
                let lastCheckTimeStamp = smarttime_1.TimeStamp.fromMilliSeconds(result.lastCheck);
                let tresholdTime = plugins.smarttime.getMilliSecondsFromUnits({ hours: 1 });
                if (!lastCheckTimeStamp.isOlderThan(timeStamp, tresholdTime)) {
                    newData.lastCheck = lastCheckTimeStamp.milliSeconds;
                    let nextCheckInMinutes = (tresholdTime - (timeStamp.milliSeconds - lastCheckTimeStamp.milliSeconds)) / 60000;
                    plugins.beautylog.log(`next update check in less than ${Math.floor(nextCheckInMinutes) + 1} minute(s): ` +
                        `${plugins.beautycolor.coloredString(`${npmnameArg} has already been checked within the last hour.`, 'pink')}`);
                    return;
                }
            }
            let npmPackage = yield this.getNpmPackageFromRegistry(npmnameArg);
            if (!npmPackage) {
                plugins.beautylog.warn('failed to retrieve package information...');
                plugins.beautylog.info('npms.io might be down');
                return;
            }
            newData.latestVersion = npmPackage.version;
            let upgradeBool = yield this.checkIfUpgrade(npmPackage, compareVersion, changelogUrlArg);
            if (upgradeBool) {
                // TODO:
            }
            this.kvStore.writeKey(npmnameArg, newData);
        });
    }
    getNpmPackageFromRegistry(npmnameArg) {
        return __awaiter(this, void 0, void 0, function* () {
            plugins.beautylog.log(`smartupdate: checking for newer version of ${plugins.beautycolor.coloredString(npmnameArg, 'pink')}...`);
            let npmRegistry = new plugins.smartnpm.NpmRegistry();
            let npmPackage;
            npmPackage = (yield npmRegistry.search({ name: npmnameArg, boostExact: true }))[0];
            return npmPackage;
        });
    }
    checkIfUpgrade(npmPackage, localVersionStringArg, changelogUrlArg) {
        return __awaiter(this, void 0, void 0, function* () {
            // create Version objects
            let versionNpm = new plugins.smartversion.SmartVersion(npmPackage.version);
            let versionLocal = new plugins.smartversion.SmartVersion(localVersionStringArg);
            if (!versionNpm.greaterThan(versionLocal)) {
                plugins.beautylog.ok(`smartupdate: You are running the latest version of ${plugins.beautycolor.coloredString(npmPackage.name, 'pink')}`);
                return false;
            }
            else {
                plugins.beautylog.warn(`There is a newer version of ${npmPackage.name} available on npm.`);
                plugins.beautylog.warn(`Your version: ${versionLocal.versionString} | version on npm: ${versionNpm.versionString}`);
                if (!process.env.CI && changelogUrlArg) {
                    plugins.beautylog.log('trying to open changelog...');
                    plugins.smartopen.openUrl(changelogUrlArg);
                }
                return true;
            }
        });
    }
}
exports.SmartUpdate = SmartUpdate;
exports.standardHandler = new SmartUpdate();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaURBQWlEO0FBRWpELHlDQUFzQztBQVV0QztJQUFBO1FBQ0UsWUFBTyxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFzRi9FLENBQUM7SUFwRk8sS0FBSyxDQUFDLFVBQWtCLEVBQUUsY0FBc0IsRUFBRSxlQUF3Qjs7WUFDOUUsdUJBQXVCO1lBQ3ZCLElBQUksU0FBUyxHQUFHLElBQUkscUJBQVMsRUFBRSxDQUFDO1lBQ2hDLElBQUksT0FBTyxHQUFHO2dCQUNaLFNBQVMsRUFBRSxTQUFTLENBQUMsWUFBWTtnQkFDakMsYUFBYSxFQUFFLE9BQU87Z0JBQ3RCLGdCQUFnQixFQUFFLEtBQUs7YUFDeEIsQ0FBQztZQUVGLDhDQUE4QztZQUM5QyxJQUFJLE1BQU0sR0FBaUIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUVsRSxJQUFJLE1BQU0sRUFBRTtnQkFDVixJQUFJLGtCQUFrQixHQUFHLHFCQUFTLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN0RSxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzVFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxFQUFFO29CQUM1RCxPQUFPLENBQUMsU0FBUyxHQUFHLGtCQUFrQixDQUFDLFlBQVksQ0FBQztvQkFDcEQsSUFBSSxrQkFBa0IsR0FDcEIsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO29CQUN0RixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FDbkIsa0NBQWtDLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLGNBQWM7d0JBQ2hGLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQ2xDLEdBQUcsVUFBVSxpREFBaUQsRUFDOUQsTUFBTSxDQUNQLEVBQUUsQ0FDTixDQUFDO29CQUNGLE9BQU87aUJBQ1I7YUFDRjtZQUNELElBQUksVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2YsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsMkNBQTJDLENBQUMsQ0FBQztnQkFDcEUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztnQkFDaEQsT0FBTzthQUNSO1lBQ0QsT0FBTyxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDO1lBQzNDLElBQUksV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQ3pGLElBQUksV0FBVyxFQUFFO2dCQUNmLFFBQVE7YUFDVDtZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3QyxDQUFDO0tBQUE7SUFFYSx5QkFBeUIsQ0FBQyxVQUFVOztZQUNoRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FDbkIsOENBQThDLE9BQU8sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUM3RSxVQUFVLEVBQ1YsTUFBTSxDQUNQLEtBQUssQ0FDUCxDQUFDO1lBQ0YsSUFBSSxXQUFXLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3JELElBQUksVUFBdUMsQ0FBQztZQUM1QyxVQUFVLEdBQUcsQ0FBQyxNQUFNLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkYsT0FBTyxVQUFVLENBQUM7UUFDcEIsQ0FBQztLQUFBO0lBRWEsY0FBYyxDQUMxQixVQUF1QyxFQUN2QyxxQkFBNkIsRUFDN0IsZUFBd0I7O1lBRXhCLHlCQUF5QjtZQUN6QixJQUFJLFVBQVUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzRSxJQUFJLFlBQVksR0FBRyxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDaEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQ3pDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUNsQixzREFBc0QsT0FBTyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQ3JGLFVBQVUsQ0FBQyxJQUFJLEVBQ2YsTUFBTSxDQUNQLEVBQUUsQ0FDSixDQUFDO2dCQUNGLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsK0JBQStCLFVBQVUsQ0FBQyxJQUFJLG9CQUFvQixDQUFDLENBQUM7Z0JBQzNGLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUNwQixpQkFBaUIsWUFBWSxDQUFDLGFBQWEsc0JBQXNCLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FDNUYsQ0FBQztnQkFDRixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksZUFBZSxFQUFFO29CQUN0QyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO29CQUNyRCxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztpQkFDNUM7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7YUFDYjtRQUNILENBQUM7S0FBQTtDQUNGO0FBdkZELGtDQXVGQztBQUNVLFFBQUEsZUFBZSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUMifQ==