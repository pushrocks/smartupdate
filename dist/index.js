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
        this.kvStore = new plugins.npmextra.KeyValueStore('custom', 'global:smartupdate');
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
                    plugins.beautylog.log(`smartupdate: next check in ${Math.round(nextCheckInMinutes)} minutes: ` +
                        `${plugins.beautycolor.coloredString(`${npmnameArg} has already been checked within the last hour.`, 'pink')}`);
                    return;
                }
            }
            let npmPackage = yield this.getNpmPackageFromRegistry(npmnameArg);
            newData.latestVersion = npmPackage.version;
            let upgradeBool = yield this.checkIfUpgrade(npmPackage, compareVersion, changelogUrlArg);
            if (upgradeBool) {
            }
            this.kvStore.writeKey(npmnameArg, newData);
        });
    }
    getNpmPackageFromRegistry(npmnameArg) {
        return __awaiter(this, void 0, void 0, function* () {
            plugins.beautylog.log(`smartupdate: checking for newer version of ${plugins.beautycolor.coloredString(npmnameArg, 'pink')}...`);
            let npmRegistry = new plugins.smartnpm.NpmRegistry();
            let npmPackage = (yield npmRegistry.search({ name: npmnameArg, boostExact: true }))[0];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaURBQWdEO0FBRWhELHlDQUFxQztBQVVyQztJQUFBO1FBQ0UsWUFBTyxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLG9CQUFvQixDQUFDLENBQUE7SUFvRTlFLENBQUM7SUFsRU8sS0FBSyxDQUFFLFVBQWtCLEVBQUUsY0FBc0IsRUFBRSxlQUF3Qjs7WUFFL0UsdUJBQXVCO1lBQ3ZCLElBQUksU0FBUyxHQUFHLElBQUkscUJBQVMsRUFBRSxDQUFBO1lBQy9CLElBQUksT0FBTyxHQUFHO2dCQUNaLFNBQVMsRUFBRSxTQUFTLENBQUMsWUFBWTtnQkFDakMsYUFBYSxFQUFFLE9BQU87Z0JBQ3RCLGdCQUFnQixFQUFFLEtBQUs7YUFDeEIsQ0FBQTtZQUVELDhDQUE4QztZQUM5QyxJQUFJLE1BQU0sR0FBaUIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUVqRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNYLElBQUksa0JBQWtCLEdBQUcscUJBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7Z0JBQ3JFLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDM0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDN0QsT0FBTyxDQUFDLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxZQUFZLENBQUE7b0JBQ25ELElBQUksa0JBQWtCLEdBQUcsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFBO29CQUM1RyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FDbkIsOEJBQThCLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsWUFBWTt3QkFDeEUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FDbEMsR0FBRyxVQUFVLGlEQUFpRCxFQUM1RCxNQUFNLENBQ1QsRUFBRSxDQUNKLENBQUE7b0JBQ0QsTUFBTSxDQUFBO2dCQUNSLENBQUM7WUFDSCxDQUFDO1lBQ0QsSUFBSSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDakUsT0FBTyxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFBO1lBQzFDLElBQUksV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFBO1lBQ3hGLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFFbEIsQ0FBQztZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUM1QyxDQUFDO0tBQUE7SUFFYSx5QkFBeUIsQ0FBRSxVQUFVOztZQUNqRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUMvSCxJQUFJLFdBQVcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDcEQsSUFBSSxVQUFVLEdBQUcsQ0FBQyxNQUFNLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDdEYsTUFBTSxDQUFDLFVBQVUsQ0FBQTtRQUNuQixDQUFDO0tBQUE7SUFFYSxjQUFjLENBQzFCLFVBQXVDLEVBQ3ZDLHFCQUE2QixFQUM3QixlQUF3Qjs7WUFFeEIseUJBQXlCO1lBQ3pCLElBQUksVUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzFFLElBQUksWUFBWSxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsQ0FBQTtZQUMvRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxzREFBc0QsT0FBTyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQ3hJLE1BQU0sQ0FBQyxLQUFLLENBQUE7WUFDZCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsK0JBQStCLFVBQVUsQ0FBQyxJQUFJLG9CQUFvQixDQUFDLENBQUE7Z0JBQzFGLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixZQUFZLENBQUMsYUFBYSxzQkFBc0IsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUE7Z0JBQ25ILEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQztvQkFDdkMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtvQkFDcEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7Z0JBQzVDLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQTtZQUNiLENBQUM7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQXJFRCxrQ0FxRUM7QUFDVSxRQUFBLGVBQWUsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFBIn0=