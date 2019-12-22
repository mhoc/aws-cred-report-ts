import { User } from "./User";

export class CredentialReport {

  constructor(
    public readonly generatedTime: Date,
    public readonly reportFormat: string,
    public readonly users: User[],
  ) {}

}
