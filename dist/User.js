"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A single IAM user, or line in the credential report csv file.
 *
 * The documentation for this class is adapted from the official
 * [AWS documentation site](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_getting-report.html),
 * making changes where necessary to encode behavior that aws-cred-report asserts beyond the
 * original CSV format.
 */
class User {
    constructor(csvRow) {
        const [username, arn, userCreationTime, passwordEnabled, passwordLastUsed, passwordLastChanged, passwordNextRotation, mfaActive, accessKey1Active, accessKey1LastRotated, accessKey1LastUsed, accessKey1LastUsedRegion, accessKey1LastUsedService, accessKey2Active, accessKey2LastRotated, accessKey2LastUsed, accessKey2LastUsedRegion, accessKey2LastUsedService, cert1Active, cert1LastRotated, cert2Active, cert2LastRotated] = csvRow;
        this.accessKey1Active = accessKey1Active === "TRUE";
        this.accessKey1LastRotated = accessKey1LastRotated !== "N/A"
            ? new Date(accessKey1LastRotated)
            : undefined;
        this.accessKey1LastUsed = accessKey1LastUsed !== "N/A"
            ? new Date(accessKey1LastUsed)
            : undefined;
        this.accessKey1LastUsedRegion = accessKey1LastUsedRegion !== "N/A"
            ? accessKey1LastUsedRegion
            : undefined;
        this.accessKey1LastUsedService = accessKey1LastUsedService !== "N/A"
            ? accessKey1LastUsedService
            : undefined;
        this.accessKey2Active = accessKey2Active === "TRUE";
        this.accessKey2LastRotated = accessKey2LastRotated !== "N/A"
            ? new Date(accessKey2LastRotated)
            : undefined;
        this.accessKey2LastUsed = accessKey2LastUsed !== "N/A"
            ? new Date(accessKey2LastUsed)
            : undefined;
        this.accessKey2LastUsedRegion = accessKey2LastUsedRegion !== "N/A"
            ? accessKey2LastUsedRegion
            : undefined;
        this.accessKey2LastUsedService = accessKey2LastUsedService !== "N/A"
            ? accessKey2LastUsedService
            : undefined;
        this.arn = arn;
        this.cert1Active = cert1Active === "TRUE";
        this.cert1LastRotated = cert1LastRotated !== "N/A"
            ? new Date(cert1LastRotated)
            : undefined;
        this.cert2Active = cert2Active === "TRUE";
        this.cert2LastRotated = cert2LastRotated !== "N/A"
            ? new Date(cert2LastRotated)
            : undefined;
        this.creationTime = new Date(userCreationTime);
        this.isRoot = username === "<root_account>";
        this.mfaActive = mfaActive === "TRUE";
        this.passwordEnabled = this.isRoot
            ? true
            : passwordEnabled === "TRUE";
        this.passwordLastChanged = passwordLastChanged !== "N/A" && passwordLastChanged !== "not_supported"
            ? new Date(passwordLastChanged)
            : undefined;
        this.passwordLastUsed = passwordLastUsed !== "N/A" && passwordLastUsed !== "no_information"
            ? new Date(passwordLastUsed)
            : undefined;
        this.passwordNextRotation = passwordNextRotation !== "N/A" && passwordNextRotation !== "not_supported"
            ? new Date(passwordNextRotation)
            : undefined;
        this.username = username;
    }
}
exports.User = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7R0FPRztBQUNILE1BQWEsSUFBSTtJQXVOZixZQUFZLE1BQWdCO1FBQzFCLE1BQU0sQ0FBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFDN0Ysb0JBQW9CLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLHFCQUFxQixFQUFFLGtCQUFrQixFQUM1Rix3QkFBd0IsRUFBRSx5QkFBeUIsRUFBRSxnQkFBZ0IsRUFBRSxxQkFBcUIsRUFDNUYsa0JBQWtCLEVBQUUsd0JBQXdCLEVBQUUseUJBQXlCLEVBQUUsV0FBVyxFQUNwRixnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLENBQUUsR0FBRyxNQUFNLENBQUM7UUFDN0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixLQUFLLE1BQU0sQ0FBQztRQUNwRCxJQUFJLENBQUMscUJBQXFCLEdBQUcscUJBQXFCLEtBQUssS0FBSztZQUMxRCxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUM7WUFDakMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNkLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsS0FBSyxLQUFLO1lBQ3BELENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztZQUM5QixDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ2QsSUFBSSxDQUFDLHdCQUF3QixHQUFHLHdCQUF3QixLQUFLLEtBQUs7WUFDaEUsQ0FBQyxDQUFDLHdCQUF3QjtZQUMxQixDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ2QsSUFBSSxDQUFDLHlCQUF5QixHQUFHLHlCQUF5QixLQUFLLEtBQUs7WUFDbEUsQ0FBQyxDQUFDLHlCQUF5QjtZQUMzQixDQUFDLENBQUMsU0FBUyxDQUFDO1FB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