"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        this.passwordLastChanged = passwordLastChanged !== "N/A"
            ? new Date(passwordLastChanged)
            : undefined;
        this.passwordLastUsed = passwordLastUsed !== "N/A"
            ? new Date(passwordLastUsed)
            : undefined;
        this.passwordNextRotation = passwordNextRotation !== "N/A"
            ? new Date(passwordNextRotation)
            : undefined;
        this.username = username;
    }
}
exports.User = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBYSxJQUFJO0lBeUJmLFlBQVksTUFBZ0I7UUFDMUIsTUFBTSxDQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixFQUM3RixvQkFBb0IsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUscUJBQXFCLEVBQUUsa0JBQWtCLEVBQzVGLHdCQUF3QixFQUFFLHlCQUF5QixFQUFFLGdCQUFnQixFQUFFLHFCQUFxQixFQUM1RixrQkFBa0IsRUFBRSx3QkFBd0IsRUFBRSx5QkFBeUIsRUFBRSxXQUFXLEVBQ3BGLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBRSxHQUFHLE1BQU0sQ0FBQztRQUM3RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLEtBQUssTUFBTSxDQUFDO1FBQ3BELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsS0FBSyxLQUFLO1lBQzFELENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztZQUNqQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ2QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixLQUFLLEtBQUs7WUFDcEQsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBQzlCLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDZCxJQUFJLENBQUMsd0JBQXdCLEdBQUcsd0JBQXdCLEtBQUssS0FBSztZQUNoRSxDQUFDLENBQUMsd0JBQXdCO1lBQzFCLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDZCxJQUFJLENBQUMseUJBQXlCLEdBQUcseUJBQXlCLEtBQUssS0FBSztZQUNsRSxDQUFDLENBQUMseUJBQXlCO1lBQzNCLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDZCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLEtBQUssTUFBTSxDQUFDO1FBQ3BELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsS0FBSyxLQUFLO1lBQzFELENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztZQUNqQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ2QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixLQUFLLEtBQUs7WUFDcEQsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBQzlCLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDZCxJQUFJLENBQUMsd0JBQXdCLEdBQUcsd0JBQXdCLEtBQUssS0FBSztZQUNoRSxDQUFDLENBQUMsd0JBQXdCO1lBQzFCLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDZCxJQUFJLENBQUMseUJBQXlCLEdBQUcseUJBQXlCLEtBQUssS0FBSztZQUNsRSxDQUFDLENBQUMseUJBQXlCO1lBQzNCLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDZCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxLQUFLLE1BQU0sQ0FBQztRQUMxQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLEtBQUssS0FBSztZQUNoRCxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUM7WUFDNUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNkLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxLQUFLLE1BQU0sQ0FBQztRQUMxQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLEtBQUssS0FBSztZQUNoRCxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUM7WUFDNUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNkLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsS0FBSyxnQkFBZ0IsQ0FBQztRQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsS0FBSyxNQUFNLENBQUM7UUFDdEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTTtZQUNoQyxDQUFDLENBQUMsSUFBSTtZQUNOLENBQUMsQ0FBQyxlQUFlLEtBQUssTUFBTSxDQUFDO1FBQy9CLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsS0FBSyxLQUFLO1lBQ3RELENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztZQUMvQixDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixLQUFLLEtBQUs7WUFDaEQsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDO1lBQzVCLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDZCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLEtBQUssS0FBSztZQUN4RCxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUM7WUFDaEMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNkLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7Q0FFRjtBQXBGRCxvQkFvRkMifQ==