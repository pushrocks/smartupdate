import { KeyValueStore } from 'npmextra';
export declare class SmartUpdate {
    kvStore: KeyValueStore;
    check(npmnameArg: string, compareVersion: string, changelogUrlArg?: string): Promise<void>;
    private getNpmPackageFromRegistry(npmnameArg);
    private checkIfUpgrade(npmPackage, versionArg, changelogUrlArg?);
}
export declare let standardHandler: SmartUpdate;
