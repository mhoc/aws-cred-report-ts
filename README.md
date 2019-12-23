# AWSCredReport

[![npm](https://img.shields.io/badge/npm-0.0.2-yellow)](https://www.npmjs.com/package/@mhoc/aws-cred-report)
[![docs](https://img.shields.io/badge/documentation-0.0.2-blue)](https://mike.hockerman.com/docs/aws-cred-report-ts)

This is a small TS library which wraps the aws-sdk to assist in generating AWS Credential Reports.

## What's Wrong With the AWS-SDK?

Well, nothing, but it could be made easier to work with.

First, the SDK includes two methods to create credential reports: `GenerateCredentialReport` and
`GetCredentialReport`. Its an asynchronous operation, and while the time between generation and
retrieval isn't usually too long, its still something callers need to think about.

Moreover, there's no method provided to determine the "status" of a "credential report generation"
operation; so, if you were to call Generate, followed by Get, and there's no credential report 
ready, you'd need to retry. This library handles the retrying for you.

Finally, you're given it back as a CSV-encoded buffer. This library fixes that for you; it'll 
parse the CSV, and return back a useful data structure.

## Usage

```ts
import { AWSCredReportClient } from "@mhoc/aws-cred-report";

const main = async () => {
  const client = new AWSCredReportClient();
  const report = await client.generateCredentialReport();
  for (const user of report.users) {
    console.log(`${user.username} mfa status: ${user.mfaActive}`);
    if (user.isRoot && !user.mfaActive) {
      console.log("root account has no mfa active!")
    }
  }
}
```
