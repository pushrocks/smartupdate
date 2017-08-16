import { KeyValueStore } from 'npmextra';
export declare class SmartUpdate {
    kvStore: KeyValueStore;
    check(npmnameArg: string, compareVersion: string): Promise<void>;
    private getNpmPackageFromRegistry(npmnameArg);
    private checkIfUpgrade(npmPackage, versionArg);
}
export declare let standardHandler: SmartUpdate;
