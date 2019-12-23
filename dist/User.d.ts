export declare class User {
    readonly accessKey1Active: boolean;
    readonly accessKey1LastRotated?: Date;
    readonly accessKey1LastUsed?: Date;
    readonly accessKey1LastUsedRegion?: string;
    readonly accessKey1LastUsedService?: string;
    readonly accessKey2Active: boolean;
    readonly accessKey2LastRotated?: Date;
    readonly accessKey2LastUsed?: Date;
    readonly accessKey2LastUsedRegion?: string;
    readonly accessKey2LastUsedService?: string;
    readonly arn: string;
    readonly cert1Active: boolean;
    readonly cert1LastRotated?: Date;
    readonly cert2Active: boolean;
    readonly cert2LastRotated?: Date;
    readonly creationTime: Date;
    readonly isRoot: boolean;
    readonly mfaActive: boolean;
    readonly passwordEnabled: boolean;
    readonly passwordLastChanged?: Date;
    readonly passwordLastUsed?: Date;
    readonly passwordNextRotation?: Date;
    readonly username: string;
    constructor(csvRow: string[]);
}
