import { IAM } from "aws-sdk";
import * as csv from "csv-parse";

import { CredentialReport } from "./CredentialReport";
import { User } from "./User";

/**
 * Client which contains a method to generate a credential report.
 */
export class AWSCredReportClient {
  private readonly iam: IAM;
  
  constructor() {
    this.iam = new IAM();
  }

  /**
   * Generate and fetch a credential report.
   * 
   * This method will retry the credential report generation process five times, with a 500ms delay
   * between each call. If the report is not generated after five times, it will throw an error with
   * the text "retry timeout". We may have to tweak this if it doesn't work for larger AWS accounts.
   */
  public async getCredentialReport(): Promise<CredentialReport> {
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
      const users: User[] = [];
      parser.on("error", err => rej(err));
      parser.on("readable", () => {
        let record;
        while (record = parser.read()) {
          const user = new User(record);
          if (user.username === "user" && user.arn === "arn") {
            // this is the header line; just ignore it
            continue;
          }
          users.push(user);
        }
      });
      parser.on("end", () => res(new CredentialReport(GeneratedTime, ReportFormat, users)));
    });
  }

}
