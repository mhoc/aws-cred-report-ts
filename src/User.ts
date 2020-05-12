/**
 * A single IAM user, or line in the credential report csv file.
 * 
 * The documentation for this class is adapted from the official
 * [AWS documentation site](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_getting-report.html),
 * making changes where necessary to encode behavior that aws-cred-report asserts beyond the 
 * original CSV format.
 */
export class User {
  /** 
   * When the user has an access key and the access key's status is Active, this value is true.
   * Otherwise it is false.
   */
  public readonly accessKey1Active: boolean;

  /**
   * The date and time when the user's access key was created or last changed. If the user does not
   * have an active access key, the field is empty.
   */
  public readonly accessKey1LastRotated?: Date;
  
  /**
   * The date and time when the user's access key was most recently used to sign an AWS API request.
   * When an access key is used more than once in a 15-minute span, only the first use is recorded 
   * in this field.
   *
   * The value in this field is empty in these cases:
   *
   * - The user does not have an access key.
   * - The access key has never been used.
   * - The access key has not been used after IAM started tracking this information on April 22, 2015.
   */
  public readonly accessKey1LastUsed?: Date;

  /**
   * The AWS Region in which the access key was most recently used. When an access key is used more
   * than once in a 15-minute span, only the first use is recorded in this field.
   *
   * The value in this field is empty in these cases:
   *
   * - The user does not have an access key.
   * - The access key has never been used.
   * - The access key was last used before IAM started tracking this information on April 22, 2015.
   * - The last used service is not Region-specific, such as Amazon S3.
   */
  public readonly accessKey1LastUsedRegion?: string;

  /**
   * The AWS service that was most recently accessed with the access key. The value in this field
   * uses the service's namespace — for example, s3 for Amazon S3 and ec2 for Amazon EC2. When an
   * access key is used more than once in a 15-minute span, only the first use is recorded in this
   * field.
   *
   * The value in this field is empty in these cases:
   *
   * - The user does not have an access key.
   * - The access key has never been used.
   * - The access key was last used before IAM started tracking this information on April 22, 2015.
   */
  public readonly accessKey1LastUsedService?: string;

  /**
   * When the user has a second access key and the second key's status is Active, this value is 
   * true. Otherwise it is false.
   *
   * Note: Users can have up to two access keys, to make rotation easier. For more information 
   * about rotating access keys, see 
   * [Rotating Access Keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_RotateAccessKey).
   */
  public readonly accessKey2Active: boolean;

  /**
   * The date and time when the user's second access key was created or last changed. If the user 
   * does not have a second access key, the field is empty.
   */
  public readonly accessKey2LastRotated?: Date;

  /**
   * The date and time when the user's second access key was most recently used to sign an AWS API 
   * request. When an access key is used more than once in a 15-minute span, only the first use is 
   * recorded in this field.
   *
   * The value in this field is empty in these cases:
   *
   * - The user does not have a second access key.
   * - The second access key has never been used.
   * - The second access key has not been used after IAM started tracking this information on April 22, 2015.
   */
  public readonly accessKey2LastUsed?: Date;

  /**
   * The AWS Region in which the second access key was most recently used. When an access key is 
   * used more than once in a 15-minute span, only the first use is recorded in this field.
   *
   * The value in this field is empty in these cases:
   *
   * - The user does not have a second access key.
   * - The second access key has never been used.
   * - The second access key was last used before IAM started tracking this information on April 22, 2015.
   * - The last used service is not Region-specific, such as Amazon S3.
   */
  public readonly accessKey2LastUsedRegion?: string;

  /**
   * The AWS service that was most recently accessed with the second access key. The value in this
   * field uses the service's namespace — for example, s3 for Amazon S3 and ec2 for Amazon EC2. When
   * an access key is used more than once in a 15-minute span, only the first use is recorded in
   * this field.
   *
   * The value in this field is empty in these cases:
   *
   * - The user does not have a second access key.
   * - The second access key has never been used.
   * - The second access key was last used before IAM started tracking this information on April 22, 2015.
   */
  public readonly accessKey2LastUsedService?: string;

  /**
   * The Amazon Resource Name (ARN) of the user. For more information about ARNs, see
   * [IAM ARNs](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html#identifiers-arns).
   */
  public readonly arn: string;

  /**
   * When the user has an X.509 signing certificate and that certificate's status is Active, this 
   * value is true. Otherwise it is false.
   */
  public readonly cert1Active: boolean;

  /**
   * The date and time when the user's signing certificate was created or last changed. If the user 
   * does not have an active signing certificate, the value in this field is empty.
   */
  public readonly cert1LastRotated?: Date;

  /**
   * When the user has a second X.509 signing certificate and that certificate's status is Active, 
   * this value is true. Otherwise it is false.
   *
   * Note: Users can have up to two X.509 signing certificates, to make certificate rotation easier.
   */
  public readonly cert2Active: boolean;

  /**
   * The date and time when the user's second signing certificate was created or last changed. If 
   * the user does not have a second active signing certificate, the value in this field is empty.
   */
  public readonly cert2LastRotated?: Date;

  /** The date and time when the user was created */
  public readonly creationTime: Date;

  /**
   * Whether the given user is the root account. This value is derived from the `user` field in
   * the original credential report.
   */
  public readonly isRoot: boolean;

  /**
   * When a multi-factor authentication (MFA) device has been enabled for the user, this value is 
   * true. Otherwise it is false.
   */
  public readonly mfaActive: boolean;

  /** 
   * When the user has a password, this value is true. Otherwise it is false.
   * While the original CSV encodes the value `not_supported` for the root account, this library
   * encodes that to `true`, given that root accounts always have a password enabled. Keeps the 
   * types cleaner.
   */
  public readonly passwordEnabled: boolean;

  /**
   * The date and time when the user's password was last set. If the user does not have a password, 
   * the value in this field is empty. The value for the AWS account (root) is always empty.
   */
  public readonly passwordLastChanged?: Date;

  /**
   * The date and time when the AWS account root user or IAM user's password was last used to sign 
   * in to an AWS website. AWS websites that capture a user's last sign-in time are the AWS 
   * Management Console, the AWS Discussion Forums, and the AWS Marketplace. When a password is 
   * used more than once in a 5-minute span, only the first use is recorded in this field.
   *
   * The value of this field will be empty when the original CSV contains either the value 
   * `no_information` or `N/A`.
   * 
   * The original value in this field is `no_information` in these cases:
   *
   * - The user's password has never been used.
   * - There is no sign-in data associated with the password, such as when user's password has not been used after IAM started tracking this information on October 20, 2014.
   * 
   * The value in this field is `N/A` (not applicable) when the user does not have a password.
   * 
   * **Important**: Due to a service issue, password last used data does not include password use 
   * from May 3rd 2018 22:50 PDT to May 23rd 2018 14:08 PDT. This affects last sign-in dates shown 
   * in the IAM console and password last used dates in the IAM credential report, and returned by 
   * the GetUser API operation. If users signed in during the affected time, the password last used 
   * date that is returned is the date the user last signed in before May 3rd 2018. For users that 
   * signed in after May 23rd 2018 14:08 PDT, the returned password last used date is accurate.
   * 
   * If you use password last used information to identify unused credentials for deletion, such as 
   * deleting users who did not sign in to AWS in the last 90 days, we recommend that you adjust 
   * your evaluation window to include dates after May 23rd 2018. Alternatively, if your users use 
   * access keys to access AWS programmatically you can refer to access key last used information 
   * because it is accurate for all dates.
   */
  public readonly passwordLastUsed?: Date;

  /**
   * When the account has a password policy that requires password rotation, this field contains 
   * the date and time when the user is required to set a new password. The value for the AWS 
   * account (root) is always empty.
   */
  public readonly passwordNextRotation?: Date;

  /** 
   * The friendly name of the user.
   * 
   * For the root account, this value is set to `<root_account>`.
   */
  public readonly username: string;
  
  constructor(csvRow: string[]) {
    const [ username, arn, userCreationTime, passwordEnabled, passwordLastUsed, passwordLastChanged,
      passwordNextRotation, mfaActive, accessKey1Active, accessKey1LastRotated, accessKey1LastUsed,
      accessKey1LastUsedRegion, accessKey1LastUsedService, accessKey2Active, accessKey2LastRotated,
      accessKey2LastUsed, accessKey2LastUsedRegion, accessKey2LastUsedService, cert1Active,
      cert1LastRotated, cert2Active, cert2LastRotated ] = csvRow;
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
