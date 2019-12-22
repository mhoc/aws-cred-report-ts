export class User {
  public readonly accessKey1Active: boolean;
  public readonly accessKey1LastRotated?: Date;
  public readonly accessKey1LastUsed?: Date;
  public readonly accessKey1LastUsedRegion?: string;
  public readonly accessKey1LastUsedService?: string;
  public readonly accessKey2Active: boolean;
  public readonly accessKey2LastRotated?: Date;
  public readonly accessKey2LastUsed?: Date;
  public readonly accessKey2LastUsedRegion?: string;
  public readonly accessKey2LastUsedService?: string;
  public readonly arn: string;
  public readonly cert1Active: boolean;
  public readonly cert1LastRotated?: Date;
  public readonly cert2Active: boolean;
  public readonly cert2LastRotated?: Date;
  public readonly creationTime: Date;
  public readonly isRoot: boolean;
  public readonly mfaActive: boolean;
  public readonly passwordEnabled: boolean;
  public readonly passwordLastChanged?: Date;
  public readonly passwordLastUsed?: Date;
  public readonly passwordNextRotation?: Date;
  public readonly username: string;
  
  constructor(csvRow: string[]) {
    const [ username, arn, userCreationTime, passwordEnabled, passwordLastUsed, passwordLastChanged,
      passwordNextRotation, mfaActive, accessKey1Active, accessKey1LastRotated, accessKey1LastUsed,
      accessKey1LastUsedRegion, accessKey1LastUsedService, accessKey2Active, accessKey2LastRotated,
      accessKey2LastUsed, accessKey2LastUsedRegion, accessKey2LastUsedService, cert1Active,
      cert1LastRotated, cert2Active, cert2LastRotated ] = csvRow;
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
