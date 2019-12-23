import { User } from "./User";
export declare class CredentialReport {
    readonly generatedTime: Date;
    readonly reportFormat: string;
    readonly users: User[];
    constructor(generatedTime: Date, reportFormat: string, users: User[]);
}
