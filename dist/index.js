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
                let compareTime = plugins.smarttime.getMilliSecondsFromUnits({ hours: 1 });
                if (!lastCheckTimeStamp.isOlderThan(timeStamp, compareTime)) {
                    plugins.beautylog.log(`smartupdate: next check in : ` +
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaURBQWdEO0FBRWhELHlDQUFxQztBQVVyQztJQUFBO1FBQ0UsWUFBTyxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLG9CQUFvQixDQUFDLENBQUE7SUErRDlFLENBQUM7SUE3RE8sS0FBSyxDQUFFLFVBQWtCLEVBQUUsY0FBc0IsRUFBRSxlQUF3Qjs7WUFDL0UsSUFBSSxNQUFNLEdBQWlCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDakUsSUFBSSxTQUFTLEdBQUcsSUFBSSxxQkFBUyxFQUFFLENBQUE7WUFFL0IsdUJBQXVCO1lBQ3ZCLElBQUksT0FBTyxHQUFHO2dCQUNaLFNBQVMsRUFBRSxTQUFTLENBQUMsWUFBWTtnQkFDakMsYUFBYSxFQUFFLE9BQU87Z0JBQ3RCLGdCQUFnQixFQUFFLEtBQUs7YUFDeEIsQ0FBQTtZQUNELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsSUFBSSxrQkFBa0IsR0FBRyxxQkFBUyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtnQkFDckUsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUMxRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1RCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FDbkIsK0JBQStCO3dCQUMvQixHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUNsQyxHQUFHLFVBQVUsaURB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