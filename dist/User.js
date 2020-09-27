"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7Ozs7O0dBT0c7QUFDSCxNQUFhLElBQUk7SUF1TmYsWUFBWSxNQUFnQjtRQUMxQixNQUFNLENBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQzdGLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxxQkFBcUIsRUFBRSxrQkFBa0IsRUFDNUYsd0JBQXdCLEVBQUUseUJBQXlCLEVBQUUsZ0JBQWdCLEVBQUUscUJBQXFCLEVBQzVGLGtCQUFrQixFQUFFLHdCQUF3QixFQUFFLHlCQUF5QixFQUFFLFdBQVcsRUFDcEYsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixDQUFFLEdBQUcsTUFBTSxDQUFDO1FBQzdELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsS0FBSyxNQUFNLENBQUM7UUFDbEUsSUFBSSxDQUFDLHFCQUFxQixHQUFHLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUs7WUFDeEUsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDO1lBQ2pDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDZCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSztZQUNsRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUM7WUFDOUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNkLElBQUksQ0FBQyx3QkFBd0IsR0FBRyx3QkFBd0IsQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLO1lBQzlFLENBQUMsQ0FBQyx3QkFBd0I7WUFDMUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNkLElBQUksQ0FBQyx5QkFBeUIsR0FBRyx5QkFBeUIs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