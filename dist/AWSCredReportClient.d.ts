import { CredentialReport } from "./CredentialReport";
/**
 * Client which contains a method to generate a credential report.
 */
export declare class AWSCredReportClient {
    private readonly iam;
    constructor();
    /**
     * Generate and fetch a credential report.
     *
     * This method will retry the credential report generation process five times, with a 500ms delay
     * between each call. If the report is not generated after five times, it will throw an error with
     * the text "retry timeout". We may have to tweak this if it doesn't work for larger AWS accounts.
     */
    getCredentialReport(): Promise<CredentialReport>;
}
