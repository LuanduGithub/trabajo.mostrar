export interface TsAppVersion {
    version: string;
    name: string;
    description?: string;
    versionLong?: string;
    versionDate: string;
    gitCommitHash?: string;
    gitCommitDate?: string;
    gitTag?: string;
};
export const versions: TsAppVersion = {
    version: '0.0.8',
    name: 'sealandApp',
    versionDate: '2020-06-23T20:58:45.438Z',
    description: 'An Ionic project',
};
export default versions;
