/**
 * A single IAM user, or line in the credential report csv file.
 *
 * The documentation for this class is adapted from the official
 * [AWS documentation site](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_getting-report.html),
 * making changes where necessary to encode behavior that aws-cred-report asserts beyond the
 * original CSV format.
 */
export declare class User {
    /**
     * When the user has an access key and the access key's status is Active, this value is true.
     * Otherwise it is false.
     */
    readonly accessKey1Active: boolean;
    /**
     * The date and time when the user's access key was created or last changed. If the user does not
     * have an active access key, the field is empty.
     */
    readonly accessKey1LastRotated?: Date;
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
    readonly accessKey1LastUsed?: Date;
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
    readonly accessKey1LastUsedRegion?: string;
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
    readonly accessKey1LastUsedService?: string;
    /**
     * When the user has a second access key and the second key's status is Active, this value is
     * true. Otherwise it is false.
     *
     * Note: Users can have up to two access keys, to make rotation easier. For more information
     * about rotating access keys, see
     * [Rotating Access Keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_RotateAccessKey).
     */
    readonly accessKey2Active: boolean;
    /**
     * The date and time when the user's second access key was created or last changed. If the user
     * does not have a second access key, the field is empty.
     */
    readonly accessKey2LastRotated?: Date;
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
    readonly accessKey2LastUsed?: Date;
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
    readonly accessKey2LastUsedRegion?: string;
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
    readonly accessKey2LastUsedService?: string;
    /**
     * The Amazon Resource Name (ARN) of the user. For more information about ARNs, see
     * [IAM ARNs](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_identifiers.html#identifiers-arns).
     */
    readonly arn: string;
    /**
     * When the user has an X.509 signing certificate and that certificate's status is Active, this
     * value is true. Otherwise it is false.
     */
    readonly cert1Active: boolean;
    /**
     * The date and time when the user's signing certificate was created or last changed. If the user
     * does not have an active signing certificate, the value in this field is empty.
     */
    readonly cert1LastRotated?: Date;
    /**
     * When the user has a second X.509 signing certificate and that certificate's status is Active,
     * this value is true. Otherwise it is false.
     *
     * Note: Users can have up to two X.509 signing certificates, to make certificate rotation easier.
     */
    readonly cert2Active: boolean;
    /**
     * The date and time when the user's second signing certificate was created or last changed. If
     * the user does not have a second active signing certificate, the value in this field is empty.
     */
    readonly cert2LastRotated?: Date;
    /** The date and time when the user was created */
    readonly creationTime: Date;
    /**
     * Whether the given user is the root account. This value is derived from the `user` field in
     * the original credential report.
     */
    readonly isRoot: boolean;
    /**
     * When a multi-factor authentication (MFA) device has been enabled for the user, this value is
     * true. Otherwise it is false.
     */
    readonly mfaActive: boolean;
    /**
     * When the user has a password, this value is true. Otherwise it is false.
     * While the original CSV encodes the value `not_supported` for the root account, this library
     * encodes that to `true`, given that root accounts always have a password enabled. Keeps the
     * types cleaner.
     */
    readonly passwordEnabled: boolean;
    /**
     * The date and time when the user's password was last set. If the user does not have a password,
     * the value in this field is empty. The value for the AWS account (root) is always empty.
     */
    readonly passwordLastChanged?: Date;
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
    readonly passwordLastUsed?: Date;
    /**
     * When the account has a password policy that requires password rotation, this field contains
     * the date and time when the user is required to set a new password. The value for the AWS
     * account (root) is always empty.
     */
    readonly passwordNextRotation?: Date;
    /**
     * The friendly name of the user.
     *
     * For the root account, this value is set to `<root_account>`.
     */
    readonly username: string;
    constructor(csvRow: string[]);
}
