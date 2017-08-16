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
                    plugins.beautylog.log(`smartupdate: next check tomorrow: ${plugins.beautycolor.coloredString(`${npmnameArg} has already been checked for today.`, 'pink')}`);
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
            plugins.beautylog.log(`smartupdate: checking for newer version of ${plugins.beautycolor.coloredString(npmnameArg, 'pink')}...`);
            let npmRegistry = new plugins.smartnpm.NpmRegistry();
            let npmPackage = (yield npmRegistry.search({ name: npmnameArg, boostExact: true }))[0];
            return npmPackage;
        });
    }
    checkIfUpgrade(npmPackage, versionArg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (npmPackage.version === versionArg) {
                plugins.beautylog.ok(`smartupdate: You are running the latest version of ${plugins.beautycolor.coloredString(npmPackage.name, 'pink')}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaURBQWdEO0FBRWhELHlDQUFxQztBQVVyQztJQUFBO1FBQ0UsWUFBTyxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLG9CQUFvQixDQUFDLENBQUE7SUErQzlFLENBQUM7SUE3Q08sS0FBSyxDQUFFLFVBQWtCLEVBQUUsY0FBc0I7O1lBQ3JELElBQUksTUFBTSxHQUFpQixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ2pFLElBQUksU0FBUyxHQUFHLElBQUkscUJBQVMsRUFBRSxDQUFBO1lBRS9CLHVCQUF1QjtZQUN2QixJQUFJLE9BQU8sR0FBRztnQkFDWixTQUFTLEVBQUUsU0FBUyxDQUFDLFlBQVk7Z0JBQ2pDLGFBQWEsRUFBRSxPQUFPO2dCQUN0QixnQkFBZ0IsRUFBRSxLQUFLO2FBQ3hCLENBQUE7WUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNYLElBQUksa0JBQWtCLEdBQUcscUJBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7Z0JBQ3JFLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDekUsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMscUNBQXFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEdBQUcsVUFBVSxzQ0FBc0MsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7b0JBQzVKLE1BQU0sQ0FBQTtnQkFDUixDQUFDO1lBQ0gsQ0FBQztZQUNELElBQUksVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLHlCQUF5QixDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ2pFLE9BQU8sQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQTtZQUMxQyxJQUFJLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFBO1lBQ3ZFLEVBQUUsQ0FBQSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFFakIsQ0FBQztZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUM1QyxDQUFDO0tBQUE7SUFFYSx5QkFBeUIsQ0FBRSxVQUFVOztZQUNqRCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUMvSCxJQUFJLFdBQVcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUE7WUFDcEQsSUFBSSxVQUFVLEdBQUcsQ0FBQyxNQUFNLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDdEYsTUFBTSxDQUFDLFVBQVUsQ0FBQTtRQUNuQixDQUFDO0tBQUE7SUFFYSxjQUFjLENBQUUsVUFBdUMsRUFBRSxVQUFrQjs7WUFDdkYsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxzREFBc0QsT0FBTyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBQ3hJLE1BQU0sQ0FBQyxLQUFLLENBQUE7WUFDZCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsK0JBQStCLFVBQVUsQ0FBQyxJQUFJLG9CQUFvQixDQUFDLENBQUE7Z0JBQzFGLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixVQUFVLHNCQUFzQixVQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtnQkFDN0YsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtnQkFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQTtZQUNiLENBQUM7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQWhERCxrQ0FnREM7QUFDVSxRQUFBLGVBQWUsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFBIn0=