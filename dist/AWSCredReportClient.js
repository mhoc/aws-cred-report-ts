"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQVdTQ3JlZFJlcG9ydENsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9BV1NDcmVkUmVwb3J0Q2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQThCO0FBQzlCLGlDQUFpQztBQUVqQyx5REFBc0Q7QUFDdEQsaUNBQThCO0FBRTlCOztHQUVHO0FBQ0gsTUFBYSxtQkFBbUI7SUFHOUI7UUFDRSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksYUFBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxtQkFBbUI7UUFDOUIsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUN0QyxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdEUsSUFBSSxLQUFLLEtBQUssVUFBVSxFQUFFO2dCQUN4QixNQUFNO2FBQ1A7WUFDRCxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUNsQztZQUNELE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0Q7UUFDRCxNQUFNLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoRyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMseURBQXlELENBQUMsQ0FBQztTQUM1RTtRQUNELElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO1NBQzNFO1FBQ0QsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQztTQUNyRTtRQUNELElBQUksWUFBWSxLQUFLLFVBQVUsRUFBRTtZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1NBQ2xFO1FBQ0QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUM5QixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDdkMsTUFBTSxLQUFLLEdBQVcsRUFBRSxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFO2dCQUN6QixJQUFJLE1BQU0sQ0FBQztnQkFDWCxPQUFPLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQzdCLE1BQU0sSUFBSSxHQUFHLElBQUksV0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM5QixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssS0FBSyxFQUFFO3dCQUNsRCwwQ0FBMEM7d0JBQzFDLFNBQVM7cUJBQ1Y7b0JBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbEI7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLG1DQUFnQixDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hGLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUVGO0FBekRELGtEQXlEQyJ9