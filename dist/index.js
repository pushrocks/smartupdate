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
    check(npmnameArg, compareVersion) {
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
                    plugins.beautylog.log('not checking for new version since this has been done already for today');
                    return;
                }
            }
            let npmPackage = yield this.getNpmPackageFromRegistry(npmnameArg);
            newData.latestVersion = npmPackage.version;
            let upgradeBool = yield this.checkIfUpgrade(npmPackage, compareVersion);
            if (upgradeBool) {
            }
            this.kvStore.writeKey(npmnameArg, newData);
        });
    }
    getNpmPackageFromRegistry(npmnameArg) {
        return __awaiter(this, void 0, void 0, function* () {
            plugins.beautylog.log(`checking for newer version of ${npmnameArg}...`);
            let npmRegistry = new plugins.smartnpm.NpmRegistry();
            let npmPackage = (yield npmRegistry.search({ name: npmnameArg, boostExact: true }))[0];
            return npmPackage;
        });
    }
    checkIfUpgrade(npmPackage, versionArg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (npmPackage.version === versionArg) {
                plugins.beautylog.ok(`You are running the latest version of ${npmPackage.name}`);
                return false;
            }
            else {
                plugins.beautylog.warn(`There is a newer version of ${npmPackage.name} available on npm.`);
                plugins.beautylog.info(`Your version: ${versionArg} | version on npm: ${npmPackage.version}`);
                plugins.beautylog.warn(`!!! You should upgrade!!!`);
                return true;
            }
        });
    }
}
exports.SmartUpdate = SmartUpdate;
exports.standardHandler = new SmartUpdate();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaURBQWdEO0FBRWhELHlDQUFxQztBQVVyQztJQUFBO1FBQ0UsWUFBTyxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLG9CQUFvQixDQUFDLENBQUE7SUErQzlFLENBQUM7SUE3Q08sS0FBSyxDQUFFLFVBQWtCLEVBQUUsY0FBc0I7O1lBQ3JELElBQUksTUFBTSxHQUFpQixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ2pFLElBQUksU0FBUyxHQUFHLElBQUkscUJBQVMsRUFBRSxDQUFBO1lBRS9CLHVCQUF1QjtZQUN2QixJQUFJLE9BQU8sR0FBRztnQkFDWixTQUFTLEVBQUUsU0FBUyxDQUFDLFlBQVk7Z0JBQ2pDLGFBQWEsRUFBRSxPQUFPO2dCQUN0QixnQkFBZ0IsRUFBRSxLQUFLO2FBQ3hCLENBQUE7WUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNYLElBQUksa0JBQWtCLEdBQUcscUJBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7Z0JBQ3JFLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDekUsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMseUVBQXlFLENBQUMsQ0FBQTtvQkFDaEcsTUFBTSxDQUFBO2dCQUNSLENBQUM7WUFDSCxDQUFDO1lBQ0QsSUFBSSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMseUJBQXlCLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDakUsT0FBTyxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFBO1lBQzFDLElBQUksV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUE7WUFDdkUsRUFBRSxDQUFBLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUVqQixDQUFDO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQzVDLENBQUM7S0FBQTtJQUVhLHlCQUF5QixDQUFFLFVBQVU7O1lBQ2pELE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxVQUFVLEtBQUssQ0FBQyxDQUFBO1lBQ3ZFLElBQUksV0FBVyxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUNwRCxJQUFJLFVBQVUsR0FBRyxDQUFDLE1BQU0sV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN0RixNQUFNLENBQUMsVUFBVSxDQUFBO1FBQ25CLENBQUM7S0FBQTtJQUVhLGNBQWMsQ0FBRSxVQUF1QyxFQUFFLFVBQWtCOztZQUN2RixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLHlDQUF5QyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtnQkFDaEYsTUFBTSxDQUFDLEtBQUssQ0FBQTtZQUNkLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQywrQkFBK0IsVUFBVSxDQUFDLElBQUksb0JBQW9CLENBQUMsQ0FBQTtnQkFDMUYsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLFVBQVUsc0JBQXNCLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO2dCQUM3RixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO2dCQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFBO1lBQ2IsQ0FBQztRQUNILENBQUM7S0FBQTtDQUNGO0FBaERELGtDQWdEQztBQUNVLFFBQUEsZUFBZSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUEifQ==