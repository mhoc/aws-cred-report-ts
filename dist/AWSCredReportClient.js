"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSCredReportClient = void 0;
const aws_sdk_1 = require("aws-sdk");
const csv = require("csv-parse");
const CredentialReport_1 = require("./CredentialReport");
const User_1 = require("./User");
/**
 * Client which contains a method to generate a credential report.
 */
class AWSCredReportClient {
    constructor() {
        this.iam = new aws_sdk_1.IAM();
    }
    /**
     * Generate and fetch a credential report.
     *
     * This method will retry the credential report generation process five times, with a 500ms delay
     * between each call. If the report is not generated after five times, it will throw an error with
     * the text "retry timeout". We may have to tweak this if it doesn't work for larger AWS accounts.
     */
    async getCredentialReport() {
        for (let retry = 0; retry < 5; retry++) {
            const { State } = await this.iam.generateCredentialReport().promise();
            if (State === "COMPLETE") {
                break;
            }
            if (retry === 4) {
                throw new Error("retry timeout");
            }
            await new Promise(r => setTimeout(r, 1000 * (retry + 1)));
        }
        const { Content, GeneratedTime, ReportFormat } = await this.iam.getCredentialReport().promise();
        if (!GeneratedTime) {
            throw new Error("no generated time found in downloaded credential report");
        }
        if (!ReportFormat) {
            throw new Error("no report format found in downloaded credential report");
        }
        if (!Content) {
            throw new Error("no content found in downloaded credential report");
        }
        if (ReportFormat !== "text/csv") {
            throw new Error(`report format is unsupported: ${ReportFormat}`);
        }
        return new Promise((res, rej) => {
            const parser = csv(Content.toString());
            const users = [];
            parser.on("error", err => rej(err));
            parser.on("readable", () => {
                let record;
                while (record = parser.read()) {
                    const user = new User_1.User(record);
                    if (user.username === "user" && user.arn === "arn") {
                        // this is the header line; just ignore it
                        continue;
                    }
                    users.push(user);
                }
            });
            parser.on("end", () => res(new CredentialReport_1.CredentialReport(GeneratedTime, ReportFormat, users)));
        });
    }
}
exports.AWSCredReportClient = AWSCredReportClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQVdTQ3JlZFJlcG9ydENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9BV1NDcmVkUmVwb3J0Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUE4QjtBQUM5QixpQ0FBaUM7QUFFakMseURBQXNEO0FBQ3RELGlDQUE4QjtBQUU5Qjs7R0FFRztBQUNILE1BQWEsbUJBQW1CO0lBRzlCO1FBQ0UsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLGFBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxLQUFLLENBQUMsbUJBQW1CO1FBQzlCLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDdEMsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3RFLElBQUksS0FBSyxLQUFLLFVBQVUsRUFBRTtnQkFDeEIsTUFBTTthQUNQO1lBQ0QsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO2dCQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDbEM7WUFDRCxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNEO1FBQ0QsTUFBTSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEcsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLHlEQUF5RCxDQUFDLENBQUM7U0FDNUU7UUFDRCxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQztTQUMzRTtRQUNELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7U0FDckU7UUFDRCxJQUFJLFlBQVksS0FBSyxVQUFVLEVBQUU7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsWUFBWSxFQUFFLENBQUMsQ0FBQztTQUNsRTtRQUNELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDOUIsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sS0FBSyxHQUFXLEVBQUUsQ0FBQztZQUN6QixNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRTtnQkFDekIsSUFBSSxNQUFNLENBQUM7Z0JBQ1gsT0FBTyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFO29CQUM3QixNQUFNLElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEtBQUssRUFBRTt3QkFDbEQsMENBQTBDO3dCQUMxQyxTQUFTO3FCQUNWO29CQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2xCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxtQ0FBZ0IsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FFRjtBQXpERCxrREF5REMifQ==