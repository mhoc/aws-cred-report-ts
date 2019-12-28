import { User } from "./User";

/**
 * Contains information about the credential report, including when it was generated and a list of
 * users.
 */
export class CredentialReport {
  /** the time the report was generated */
  public readonly generatedTime: Date;

  /** 
   * the content-encoding of the report.
   * 
   * this should always be set to 'text/csv'; if, for whatever reason, this library receives back a
   * report that is not in a text/csv format, the process will fail out. i don't believe this should
   * happen.
   */
  public readonly reportFormat: string;

  /** a list of the user information we were able to parse out of the report. */
  public readonly users: User[];

  constructor(generatedTime: Date, reportFormat: string, users: User[]) {
    this.generatedTime = generatedTime;
    this.reportFormat = reportFormat;
    this.users = users;
  }

}
