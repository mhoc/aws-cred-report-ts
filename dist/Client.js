"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const csv = require("csv-parse");
const CredentialReport_1 = require("./CredentialReport");
const User_1 = require("./User");
class AWSCredReportClient {
    constructor() {
        this.iam = new aws_sdk_1.IAM();
    }
    async getCredentialReport() {
        for (let retry = 0; retry < 5; retry++) {
            const { State } = await this.iam.generateCredentialReport().promise();
            if (State === "COMPLETE") {
                break;
            }
            if (retry === 4) {
                throw new Error("retry timeout");
            }
            await new Promise(r => setTimeout(r, 500));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUE4QjtBQUM5QixpQ0FBaUM7QUFFakMseURBQXNEO0FBQ3RELGlDQUE4QjtBQUU5QixNQUFhLG1CQUFtQjtJQUc5QjtRQUNFLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxhQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU0sS0FBSyxDQUFDLG1CQUFtQjtRQUM5QixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3RDLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN0RSxJQUFJLEtBQUssS0FBSyxVQUFVLEVBQUU7Z0JBQ3hCLE1BQU07YUFDUDtZQUNELElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtnQkFDZixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ2xDO1lBQ0QsTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUM1QztRQUNELE1BQU0sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hHLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO1NBQzVFO1FBQ0QsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7U0FDM0U7UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO1NBQ3JFO1FBQ0QsSUFBSSxZQUFZLEtBQUssVUFBVSxFQUFFO1lBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLFlBQVksRUFBRSxDQUFDLENBQUM7U0FDbEU7UUFDRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzlCLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUN2QyxNQUFNLEtBQUssR0FBVyxFQUFFLENBQUM7WUFDekIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUU7Z0JBQ3pCLElBQUksTUFBTSxDQUFDO2dCQUNYLE9BQU8sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDN0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzlCLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxLQUFLLEVBQUU7d0JBQ2xELDBDQUEwQzt3QkFDMUMsU0FBUztxQkFDVjtvQkFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNsQjtZQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksbUNBQWdCLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEYsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBRUY7QUFsREQsa0RBa0RDIn0=