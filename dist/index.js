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
            let result = yield this.kvStore.readKey(npmnameArg);
            let timeStamp = new smarttime_1.TimeStamp();
            // the newData to write
            let newData = {
                lastCheck: timeStamp.milliSeconds,
                latestVersion: 'x.x.x',
                performedUpgrade: false
            };
            if (result) {
                let lastCheckTimeStamp = smarttime_1.TimeStamp.fromMilliSeconds(result.lastCheck);
                let compareTime = plugins.smarttime.getMilliSecondsFromUnits({ days: 1 });
                if (!lastCheckTimeStamp.isOlderThan(timeStamp, compareTime)) {
                    plugins.beautylog.log(`smartupdate: next check tomorrow: ${plugins.beautycolor.coloredString(`${npmnameArg} has already been checked for today.`, 'pink')}`);
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
    checkIfUpgrade(npmPackage, versionArg, changelogUrlArg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (npmPackage.version === versionArg) {
                plugins.beautylog.ok(`smartupdate: You are running the latest version of ${plugins.beautycolor.coloredString(npmPackage.name, 'pink')}`);
                return false;
            }
            else {
                plugins.beautylog.warn(`There is a newer version of ${npmPackage.name} available on npm.`);
                plugins.beautylog.warn(`Your version: ${versionArg} | version on npm: ${npmPackage.version}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaURBQWdEO0FBRWhELHlDQUFxQztBQVVyQztJQUFBO1FBQ0UsWUFBTyxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLG9CQUFvQixDQUFDLENBQUE7SUFzRDlFLENBQUM7SUFwRE8sS0FBSyxDQUFFLFVBQWtCLEVBQUUsY0FBc0IsRUFBRSxlQUF3Qjs7WUFDL0UsSUFBSSxNQUFNLEdBQWlCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDakUsSUFBSSxTQUFTLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUE7WUFFL0IsdUJBQXVCO1lBQ3ZCLElBQUksT0FBTyxHQUFHO2dCQUNaLFNBQVMsRUFBRSxTQUFTLENBQUMsWUFBWTtnQkFDakMsYUFBYSxFQUFFLE9BQU87Z0JBQ3RCLGdCQUFnQixFQUFFLEtBQUs7YUFDeEIsQ0FBQTtZQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsSUFBSSxrQkFBa0IsR0FBRyxxQkFBUyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtnQkFDckUsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUN6RSxFQUFFLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1RCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsR0FBRyxVQUFVLHNDQUFzQyxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtvQkFDNUosTUFBTSxDQUFBO2dCQUNSLENBQUM7WUFDSCxDQUFDO1lBQ0QsSUFBSSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDakUsT0FBTyxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFBO1lBQzFDLElBQUksV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFBO1lBQ3hGLEVBQUUsQ0FBQSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFFakIsQ0FBQztZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUM1QyxDQUFDO0tBQUE7SUFFYSx5QkFBeUIsQ0FBRSxVQUFVOztZQUNqRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUMvSCxJQUFJLFdBQVcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDcEQsSUFBSSxVQUFVLEdBQUcsQ0FBQyxNQUFNLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDdEYsTUFBTSxDQUFDLFVBQVUsQ0FBQTtRQUNuQixDQUFDO0tBQUE7SUFFYSxjQUFjLENBQzFCLFVBQXVDLEVBQ3ZDLFVBQWtCLEVBQ2xCLGVBQXdCOztZQUV4QixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLHNEQUFzRCxPQUFPLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDeEksTUFBTSxDQUFDLEtBQUssQ0FBQTtZQUNkLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQywrQkFBK0IsVUFBVSxDQUFDLElBQUksb0JBQW9CLENBQUMsQ0FBQTtnQkFDMUYsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLFVBQVUsc0JBQXNCLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO2dCQUM3RixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUE7b0JBQ3BELE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO2dCQUM1QyxDQUFDO2dCQUNELE1BQU0sQ0FBQyxJQUFJLENBQUE7WUFDYixDQUFDO1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUF2REQsa0NBdURDO0FBQ1UsUUFBQSxlQUFlLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQSJ9