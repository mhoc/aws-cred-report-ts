import { CredentialReport } from "./CredentialReport";
export declare class AWSCredReportClient {
    private readonly iam;
    constructor();
    getCredentialReport(): Promise<CredentialReport>;
}
