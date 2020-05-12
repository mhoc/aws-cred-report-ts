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
        this.accessKey1Active = accessKey1Active.toLowerCase() === "true";
        this.accessKey1LastRotated = accessKey1LastRotated.toLowerCase() !== "n/a"
            ? new Date(accessKey1LastRotated)
            : undefined;
        this.accessKey1LastUsed = accessKey1LastUsed.toLowerCase() !== "n/a"
            ? new Date(accessKey1LastUsed)
            : undefined;
        this.accessKey1LastUsedRegion = accessKey1LastUsedRegion.toLowerCase() !== "n/a"
            ? accessKey1LastUsedRegion
            : undefined;
        this.accessKey1LastUsedService = accessKey1LastUsedService.toLowerCase() !== "n/a"
            ? accessKey1LastUsedService
            : undefined;
        this.accessKey2Active = accessKey2Active.toLowerCase() === "true";
        this.accessKey2LastRotated = accessKey2LastRotated.toLowerCase() !== "n/a"
            ? new Date(accessKey2LastRotated)
            : undefined;
        this.accessKey2LastUsed = accessKey2LastUsed.toLowerCase() !== "n/a"
            ? new Date(accessKey2LastUsed)
            : undefined;
        this.accessKey2LastUsedRegion = accessKey2LastUsedRegion.toLowerCase() !== "n/a"
            ? accessKey2LastUsedRegion
            : undefined;
        this.accessKey2LastUsedService = accessKey2LastUsedService.toLowerCase() !== "n/a"
            ? accessKey2LastUsedService
            : undefined;
        this.arn = arn;
        this.cert1Active = cert1Active.toLowerCase() === "true";
        this.cert1LastRotated = cert1LastRotated.toLowerCase() !== "n/a"
            ? new Date(cert1LastRotated)
            : undefined;
        this.cert2Active = cert2Active.toLowerCase() === "true";
        this.cert2LastRotated = cert2LastRotated.toLowerCase() !== "n/a"
            ? new Date(cert2LastRotated)
            : undefined;
        this.creationTime = new Date(userCreationTime);
        this.isRoot = username === "<root_account>";
        this.mfaActive = mfaActive.toLowerCase() === "true";
        this.passwordEnabled = this.isRoot
            ? true
            : passwordEnabled.toLowerCase() === "true";
        this.passwordLastChanged = passwordLastChanged.toLowerCase() !== "n/a" && passwordLastChanged.toLowerCase() !== "not_supported"
            ? new Date(passwordLastChanged)
            : undefined;
        this.passwordLastUsed = passwordLastUsed.toLowerCase() !== "n/a" && passwordLastUsed.toLowerCase() !== "no_information"
            ? new Date(passwordLastUsed)
            : undefined;
        this.passwordNextRotation = passwordNextRotation.toLowerCase() !== "n/a" && passwordNextRotation.toLowerCase() !== "not_supported"
            ? new Date(passwordNextRotation)
            : undefined;
        this.username = username;
    }
}
exports.User = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7R0FPRztBQUNILE1BQWEsSUFBSTtJQXVOZixZQUFZLE1BQWdCO1FBQzFCLE1BQU0sQ0FBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFDN0Ysb0JBQW9CLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLHFCQUFxQixFQUFFLGtCQUFrQixFQUM1Rix3QkFBd0IsRUFBRSx5QkFBeUIsRUFBRSxnQkFBZ0IsRUFBRSxxQkFBcUIsRUFDNUYsa0JBQWtCLEVBQUUsd0JBQXdCLEVBQUUseUJBQXlCLEVBQUUsV0FBVyxFQUNwRixnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLENBQUUsR0FBRyxNQUFNLENBQUM7UUFDN0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU0sQ0FBQztRQUNsRSxJQUFJLENBQUMscUJBQXFCLEdBQUcscUJBQXFCLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSztZQUN4RSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMscUJBQXFCLENBQUM7WUFDakMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNkLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLO1lBQ2xFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztZQUM5QixDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ2QsSUFBSSxDQUFDLHdCQUF3QixHQUFHLHdCQUF3QixDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUs7WUFDOUUsQ0FBQyxDQUFDLHdCQUF3QjtZQUMxQixDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ2QsSUFBSSxDQUFDLHlCQUF5QixHQUFHLHlCQUF5QixD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