import * as plugins from './smartupdate.plugins';
export declare class SmartUpdate {
    kvStore: plugins.npmextra.KeyValueStore;
    check(npmnameArg: string, compareVersion: string, changelogUrlArg?: string): Promise<void>;
    private getNpmPackageFromRegistry(npmnameArg);
    private checkIfUpgrade(npmPackage, localVersionStringArg, changelogUrlArg?);
}
export declare let standardHandler: SmartUpdate;
