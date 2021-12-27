type i8 = number;
type i16 = number;
type i32 = number;
type i64 = bigint;
type isize = number;
type u8 = number;
type u16 = number;
type u32 = number;
type u64 = bigint;
type usize = number;
type f32 = number;
type f64 = number;
type bool = boolean | number;
export function __protobuf_alloc(length: i32): usize;
export function __protobuf_free(view: usize): void;
export function __protobuf_getLength(view: usize): u32;
export function __protobuf_getAddr(view: usize): usize;
export namespace google {
  export namespace protobuf {
    export class Timestamp {
      static wrap(ptr: usize): Timestamp;
      valueOf(): usize;
      static decodeArrayBuffer(buf: usize): usize;
      static decode(view: usize): usize;
      seconds: i64;
      nanos: i32;
      size(): u32;
      encodeDataView(): usize;
      encode(encoder?: usize): usize;
      constructor();
    }
    export enum NullValue {
      NULL_VALUE,
    }
    export class Struct {
      static wrap(ptr: usize): Struct;
      valueOf(): usize;
      static decodeArrayBuffer(buf: usize): usize;
      static decode(view: usize): usize;
      fields: usize;
      size(): u32;
      encodeDataView(): usize;
      encode(encoder?: usize): usize;
      constructor();
    }
    export class Value {
      static wrap(ptr: usize): Value;
      valueOf(): usize;
      static decodeArrayBuffer(buf: usize): usize;
      static decode(view: usize): usize;
      null_value: u32;
      number_value: f64;
      string_value: usize;
      bool_value: bool;
      struct_value: usize;
      list_value: usize;
      size(): u32;
      encodeDataView(): usize;
      encode(encoder?: usize): usize;
      constructor();
    }
    export class ListValue {
      static wrap(ptr: usize): ListValue;
      valueOf(): usize;
      static decodeArrayBuffer(buf: usize): usize;
      static decode(view: usize): usize;
      values: usize;
      size(): u32;
      encodeDataView(): usize;
      encode(encoder?: usize): usize;
      constructor();
    }
  }
}
export namespace wrappers {
  export class StringValues {
    static wrap(ptr: usize): StringValues;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Values: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class LabelValues {
    static wrap(ptr: usize): LabelValues;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Values: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
}
export namespace types {
  export enum PrivateKeyType {
    RAW,
    PKCS11,
  }
  export enum ProxyListenerMode {
    Separate,
    Multiplex,
  }
  export enum RoutingStrategy {
    UNAMBIGUOUS_MATCH,
    MOST_RECENT,
  }
  export enum UserTokenUsage {
    USER_TOKEN_USAGE_UNSPECIFIED,
    USER_TOKEN_RECOVER_PASSWORD,
    USER_TOKEN_RECOVER_MFA,
  }
  export enum RequestState {
    NONE,
    PENDING,
    APPROVED,
    DENIED,
  }
  export class KeepAlive {
    static wrap(ptr: usize): KeepAlive;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Name: usize;
    Namespace: usize;
    LeaseID: i64;
    Expires: usize;
    Type: u32;
    HostID: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export enum KeepAlive_KeepAliveType {
    UNKNOWN,
    NODE,
    APP,
    DATABASE,
    WINDOWS_DESKTOP,
  }
  export class Metadata {
    static wrap(ptr: usize): Metadata;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Name: usize;
    Namespace: usize;
    Description: usize;
    Labels: usize;
    Expires: usize;
    ID: i64;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class Rotation {
    static wrap(ptr: usize): Rotation;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    State: usize;
    Phase: usize;
    Mode: usize;
    CurrentID: usize;
    Started: usize;
    GracePeriod: i64;
    LastRotated: usize;
    Schedule: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class RotationSchedule {
    static wrap(ptr: usize): RotationSchedule;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    UpdateClients: usize;
    UpdateServers: usize;
    Standby: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ResourceHeader {
    static wrap(ptr: usize): ResourceHeader;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class DatabaseServerV3 {
    static wrap(ptr: usize): DatabaseServerV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class DatabaseServerSpecV3 {
    static wrap(ptr: usize): DatabaseServerSpecV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Description: usize;
    Protocol: usize;
    URI: usize;
    CACert: usize;
    AWS: usize;
    Version: usize;
    Hostname: usize;
    HostID: usize;
    DynamicLabels: usize;
    Rotation: usize;
    GCP: usize;
    Database: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class DatabaseV3List {
    static wrap(ptr: usize): DatabaseV3List;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Databases: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class DatabaseV3 {
    static wrap(ptr: usize): DatabaseV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    Status: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class DatabaseSpecV3 {
    static wrap(ptr: usize): DatabaseSpecV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Protocol: usize;
    URI: usize;
    CACert: usize;
    DynamicLabels: usize;
    AWS: usize;
    GCP: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class DatabaseStatusV3 {
    static wrap(ptr: usize): DatabaseStatusV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    CACert: usize;
    AWS: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AWS {
    static wrap(ptr: usize): AWS;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Region: usize;
    Redshift: usize;
    RDS: usize;
    AccountID: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class Redshift {
    static wrap(ptr: usize): Redshift;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    ClusterID: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class RDS {
    static wrap(ptr: usize): RDS;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    InstanceID: usize;
    ClusterID: usize;
    ResourceID: usize;
    IAMAuth: bool;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class GCPCloudSQL {
    static wrap(ptr: usize): GCPCloudSQL;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    ProjectID: usize;
    InstanceID: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ServerV2 {
    static wrap(ptr: usize): ServerV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ServerV2List {
    static wrap(ptr: usize): ServerV2List;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Servers: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ServerSpecV2 {
    static wrap(ptr: usize): ServerSpecV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Addr: usize;
    PublicAddr: usize;
    Hostname: usize;
    CmdLabels: usize;
    Rotation: usize;
    UseTunnel: bool;
    Version: usize;
    Apps: usize;
    KubernetesClusters: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AppServerV3 {
    static wrap(ptr: usize): AppServerV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AppServerSpecV3 {
    static wrap(ptr: usize): AppServerSpecV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Version: usize;
    Hostname: usize;
    HostID: usize;
    Rotation: usize;
    App: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AppV3List {
    static wrap(ptr: usize): AppV3List;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Apps: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AppV3 {
    static wrap(ptr: usize): AppV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AppSpecV3 {
    static wrap(ptr: usize): AppSpecV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    URI: usize;
    PublicAddr: usize;
    DynamicLabels: usize;
    InsecureSkipVerify: bool;
    Rewrite: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class App {
    static wrap(ptr: usize): App;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Name: usize;
    URI: usize;
    PublicAddr: usize;
    StaticLabels: usize;
    DynamicLabels: usize;
    InsecureSkipVerify: bool;
    Rewrite: usize;
    Description: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class Rewrite {
    static wrap(ptr: usize): Rewrite;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Redirect: usize;
    Headers: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class Header {
    static wrap(ptr: usize): Header;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Name: usize;
    Value: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class CommandLabelV2 {
    static wrap(ptr: usize): CommandLabelV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Period: i64;
    Command: usize;
    Result: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SSHKeyPair {
    static wrap(ptr: usize): SSHKeyPair;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    PublicKey: usize;
    PrivateKey: usize;
    PrivateKeyType: u32;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class TLSKeyPair {
    static wrap(ptr: usize): TLSKeyPair;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Cert: usize;
    Key: usize;
    KeyType: u32;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class JWTKeyPair {
    static wrap(ptr: usize): JWTKeyPair;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    PublicKey: usize;
    PrivateKey: usize;
    PrivateKeyType: u32;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class CertAuthorityV2 {
    static wrap(ptr: usize): CertAuthorityV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class CertAuthoritySpecV2 {
    static wrap(ptr: usize): CertAuthoritySpecV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Type: usize;
    ClusterName: usize;
    CheckingKeys: usize;
    SigningKeys: usize;
    Roles: usize;
    RoleMap: usize;
    TLSKeyPairs: usize;
    Rotation: usize;
    SigningAlg: u32;
    JWTKeyPairs: usize;
    ActiveKeys: usize;
    AdditionalTrustedKeys: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export enum CertAuthoritySpecV2_SigningAlgType {
    UNKNOWN,
    RSA_SHA1,
    RSA_SHA2_256,
    RSA_SHA2_512,
  }
  export class CAKeySet {
    static wrap(ptr: usize): CAKeySet;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    SSH: usize;
    TLS: usize;
    JWT: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class RoleMapping {
    static wrap(ptr: usize): RoleMapping;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Remote: usize;
    Local: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ProvisionTokenV1 {
    static wrap(ptr: usize): ProvisionTokenV1;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Roles: usize;
    Expires: usize;
    Token: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ProvisionTokenV2 {
    static wrap(ptr: usize): ProvisionTokenV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ProvisionTokenV2List {
    static wrap(ptr: usize): ProvisionTokenV2List;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    ProvisionTokens: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class TokenRule {
    static wrap(ptr: usize): TokenRule;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    AWSAccount: usize;
    AWSRegions: usize;
    AWSRole: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ProvisionTokenSpecV2 {
    static wrap(ptr: usize): ProvisionTokenSpecV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Roles: usize;
    allow: usize;
    AWSIIDTTL: i64;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class StaticTokensV2 {
    static wrap(ptr: usize): StaticTokensV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class StaticTokensSpecV2 {
    static wrap(ptr: usize): StaticTokensSpecV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    StaticTokens: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ClusterNameV2 {
    static wrap(ptr: usize): ClusterNameV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ClusterNameSpecV2 {
    static wrap(ptr: usize): ClusterNameSpecV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    ClusterName: usize;
    ClusterID: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ClusterAuditConfigV2 {
    static wrap(ptr: usize): ClusterAuditConfigV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ClusterAuditConfigSpecV2 {
    static wrap(ptr: usize): ClusterAuditConfigSpecV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Type: usize;
    Region: usize;
    AuditSessionsURI: usize;
    AuditEventsURI: usize;
    EnableContinuousBackups: bool;
    EnableAutoScaling: bool;
    ReadMaxCapacity: i64;
    ReadMinCapacity: i64;
    ReadTargetValue: f64;
    WriteMaxCapacity: i64;
    WriteMinCapacity: i64;
    WriteTargetValue: f64;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ClusterNetworkingConfigV2 {
    static wrap(ptr: usize): ClusterNetworkingConfigV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ClusterNetworkingConfigSpecV2 {
    static wrap(ptr: usize): ClusterNetworkingConfigSpecV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    ClientIdleTimeout: i64;
    KeepAliveInterval: i64;
    KeepAliveCountMax: i64;
    SessionControlTimeout: i64;
    ClientIdleTimeoutMessage: usize;
    WebIdleTimeout: i64;
    ProxyListenerMode: u32;
    RoutingStrategy: u32;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SessionRecordingConfigV2 {
    static wrap(ptr: usize): SessionRecordingConfigV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SessionRecordingConfigSpecV2 {
    static wrap(ptr: usize): SessionRecordingConfigSpecV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Mode: usize;
    ProxyChecksHostKeys: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AuthPreferenceV2 {
    static wrap(ptr: usize): AuthPreferenceV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AuthPreferenceSpecV2 {
    static wrap(ptr: usize): AuthPreferenceSpecV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Type: usize;
    SecondFactor: usize;
    ConnectorName: usize;
    U2F: usize;
    RequireSessionMFA: bool;
    DisconnectExpiredCert: usize;
    AllowLocalAuth: usize;
    MessageOfTheDay: usize;
    LockingMode: usize;
    Webauthn: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class U2F {
    static wrap(ptr: usize): U2F;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    AppID: usize;
    Facets: usize;
    DeviceAttestationCAs: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class Webauthn {
    static wrap(ptr: usize): Webauthn;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    RPID: usize;
    AttestationAllowedCAs: usize;
    AttestationDeniedCAs: usize;
    Disabled: bool;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class Namespace {
    static wrap(ptr: usize): Namespace;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class NamespaceSpec {
    static wrap(ptr: usize): NamespaceSpec;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class UserTokenV3 {
    static wrap(ptr: usize): UserTokenV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class UserTokenSpecV3 {
    static wrap(ptr: usize): UserTokenSpecV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    User: usize;
    URL: usize;
    Usage: u32;
    Created: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class UserTokenSecretsV3 {
    static wrap(ptr: usize): UserTokenSecretsV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class UserTokenSecretsSpecV3 {
    static wrap(ptr: usize): UserTokenSecretsSpecV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    OTPKey: usize;
    QRCode: usize;
    Created: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AccessRequestV3 {
    static wrap(ptr: usize): AccessRequestV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AccessReviewThreshold {
    static wrap(ptr: usize): AccessReviewThreshold;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Name: usize;
    Filter: usize;
    Approve: u32;
    Deny: u32;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AccessReview {
    static wrap(ptr: usize): AccessReview;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Author: usize;
    Roles: usize;
    ProposedState: u32;
    Reason: usize;
    Created: usize;
    Annotations: usize;
    ThresholdIndexes: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AccessReviewSubmission {
    static wrap(ptr: usize): AccessReviewSubmission;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    RequestID: usize;
    Review: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ThresholdIndexSet {
    static wrap(ptr: usize): ThresholdIndexSet;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Indexes: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ThresholdIndexSets {
    static wrap(ptr: usize): ThresholdIndexSets;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Sets: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AccessRequestSpecV3 {
    static wrap(ptr: usize): AccessRequestSpecV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    User: usize;
    Roles: usize;
    State: u32;
    Created: usize;
    Expires: usize;
    RequestReason: usize;
    ResolveReason: usize;
    ResolveAnnotations: usize;
    SystemAnnotations: usize;
    Thresholds: usize;
    RoleThresholdMapping: usize;
    Reviews: usize;
    SuggestedReviewers: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AccessRequestFilter {
    static wrap(ptr: usize): AccessRequestFilter;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    ID: usize;
    User: usize;
    State: u32;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AccessCapabilities {
    static wrap(ptr: usize): AccessCapabilities;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    RequestableRoles: usize;
    SuggestedReviewers: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AccessCapabilitiesRequest {
    static wrap(ptr: usize): AccessCapabilitiesRequest;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    User: usize;
    RequestableRoles: bool;
    SuggestedReviewers: bool;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class PluginDataV3 {
    static wrap(ptr: usize): PluginDataV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class PluginDataEntry {
    static wrap(ptr: usize): PluginDataEntry;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Data: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class PluginDataSpecV3 {
    static wrap(ptr: usize): PluginDataSpecV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Entries: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class PluginDataFilter {
    static wrap(ptr: usize): PluginDataFilter;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    Resource: usize;
    Plugin: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class PluginDataUpdateParams {
    static wrap(ptr: usize): PluginDataUpdateParams;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    Resource: usize;
    Plugin: usize;
    Set: usize;
    Expect: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class RoleV4 {
    static wrap(ptr: usize): RoleV4;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class RoleSpecV4 {
    static wrap(ptr: usize): RoleSpecV4;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Options: usize;
    Allow: usize;
    Deny: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class RoleOptions {
    static wrap(ptr: usize): RoleOptions;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    ForwardAgent: bool;
    MaxSessionTTL: i64;
    PortForwarding: usize;
    CertificateFormat: usize;
    ClientIdleTimeout: i64;
    DisconnectExpiredCert: bool;
    BPF: usize;
    PermitX11Forwarding: bool;
    MaxConnections: i64;
    MaxSessions: i64;
    RequestAccess: usize;
    RequestPrompt: usize;
    RequireSessionMFA: bool;
    Lock: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class RoleConditions {
    static wrap(ptr: usize): RoleConditions;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Logins: usize;
    Namespaces: usize;
    NodeLabels: usize;
    Rules: usize;
    KubeGroups: usize;
    Request: usize;
    KubeUsers: usize;
    AppLabels: usize;
    ClusterLabels: usize;
    KubernetesLabels: usize;
    DatabaseLabels: usize;
    DatabaseNames: usize;
    DatabaseUsers: usize;
    Impersonate: usize;
    ReviewRequests: usize;
    AWSRoleARNs: usize;
    WindowsDesktopLogins: usize;
    WindowsDesktopLabels: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AccessRequestConditions {
    static wrap(ptr: usize): AccessRequestConditions;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Roles: usize;
    ClaimsToRoles: usize;
    Annotations: usize;
    Thresholds: usize;
    SuggestedReviewers: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AccessReviewConditions {
    static wrap(ptr: usize): AccessReviewConditions;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Roles: usize;
    ClaimsToRoles: usize;
    Where: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ClaimMapping {
    static wrap(ptr: usize): ClaimMapping;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Claim: usize;
    Value: usize;
    Roles: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class Rule {
    static wrap(ptr: usize): Rule;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Resources: usize;
    Verbs: usize;
    Where: usize;
    Actions: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ImpersonateConditions {
    static wrap(ptr: usize): ImpersonateConditions;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Users: usize;
    Roles: usize;
    Where: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class BoolValue {
    static wrap(ptr: usize): BoolValue;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Value: bool;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class UserV2 {
    static wrap(ptr: usize): UserV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class UserSpecV2 {
    static wrap(ptr: usize): UserSpecV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    OIDCIdentities: usize;
    SAMLIdentities: usize;
    GithubIdentities: usize;
    Roles: usize;
    Traits: usize;
    Status: usize;
    Expires: usize;
    CreatedBy: usize;
    LocalAuth: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ExternalIdentity {
    static wrap(ptr: usize): ExternalIdentity;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    ConnectorID: usize;
    Username: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class LoginStatus {
    static wrap(ptr: usize): LoginStatus;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    IsLocked: bool;
    LockedMessage: usize;
    LockedTime: usize;
    LockExpires: usize;
    RecoveryAttemptLockExpires: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class CreatedBy {
    static wrap(ptr: usize): CreatedBy;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Connector: usize;
    Time: usize;
    User: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class U2FRegistrationData {
    static wrap(ptr: usize): U2FRegistrationData;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Raw: usize;
    KeyHandle: usize;
    PubKey: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class LocalAuthSecrets {
    static wrap(ptr: usize): LocalAuthSecrets;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    PasswordHash: usize;
    TOTPKey: usize;
    U2FRegistration: usize;
    U2FCounter: u32;
    MFA: usize;
    Webauthn: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class MFADevice {
    static wrap(ptr: usize): MFADevice;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    kind: usize;
    sub_kind: usize;
    version: usize;
    metadata: usize;
    id: usize;
    added_at: usize;
    last_used: usize;
    totp: usize;
    u2f: usize;
    webauthn: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class TOTPDevice {
    static wrap(ptr: usize): TOTPDevice;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    key: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class U2FDevice {
    static wrap(ptr: usize): U2FDevice;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    key_handle: usize;
    pub_key: usize;
    counter: u32;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class WebauthnDevice {
    static wrap(ptr: usize): WebauthnDevice;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    credential_id: usize;
    public_key_cbor: usize;
    attestation_type: usize;
    aaguid: usize;
    signature_counter: u32;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class WebauthnLocalAuth {
    static wrap(ptr: usize): WebauthnLocalAuth;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    UserID: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ConnectorRef {
    static wrap(ptr: usize): ConnectorRef;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Type: usize;
    ID: usize;
    Identity: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class UserRef {
    static wrap(ptr: usize): UserRef;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Name: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ReverseTunnelV2 {
    static wrap(ptr: usize): ReverseTunnelV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ReverseTunnelSpecV2 {
    static wrap(ptr: usize): ReverseTunnelSpecV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    ClusterName: usize;
    DialAddrs: usize;
    Type: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class TunnelConnectionV2 {
    static wrap(ptr: usize): TunnelConnectionV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class TunnelConnectionSpecV2 {
    static wrap(ptr: usize): TunnelConnectionSpecV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    ClusterName: usize;
    ProxyName: usize;
    LastHeartbeat: usize;
    Type: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SemaphoreFilter {
    static wrap(ptr: usize): SemaphoreFilter;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    SemaphoreKind: usize;
    SemaphoreName: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AcquireSemaphoreRequest {
    static wrap(ptr: usize): AcquireSemaphoreRequest;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    SemaphoreKind: usize;
    SemaphoreName: usize;
    MaxLeases: i64;
    Expires: usize;
    Holder: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SemaphoreLease {
    static wrap(ptr: usize): SemaphoreLease;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    SemaphoreKind: usize;
    SemaphoreName: usize;
    LeaseID: usize;
    Expires: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SemaphoreLeaseRef {
    static wrap(ptr: usize): SemaphoreLeaseRef;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    LeaseID: usize;
    Expires: usize;
    Holder: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SemaphoreV3 {
    static wrap(ptr: usize): SemaphoreV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SemaphoreSpecV3 {
    static wrap(ptr: usize): SemaphoreSpecV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Leases: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class WebSessionV2 {
    static wrap(ptr: usize): WebSessionV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class WebSessionSpecV2 {
    static wrap(ptr: usize): WebSessionSpecV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    User: usize;
    Pub: usize;
    Priv: usize;
    TLSCert: usize;
    BearerToken: usize;
    BearerTokenExpires: usize;
    Expires: usize;
    LoginTime: usize;
    IdleTimeout: i64;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class WebSessionFilter {
    static wrap(ptr: usize): WebSessionFilter;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    User: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class RemoteClusterV3 {
    static wrap(ptr: usize): RemoteClusterV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Status: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class RemoteClusterStatusV3 {
    static wrap(ptr: usize): RemoteClusterStatusV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Connection: usize;
    LastHeartbeat: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class KubernetesCluster {
    static wrap(ptr: usize): KubernetesCluster;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Name: usize;
    StaticLabels: usize;
    DynamicLabels: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class KubernetesClusterV3 {
    static wrap(ptr: usize): KubernetesClusterV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class KubernetesClusterSpecV3 {
    static wrap(ptr: usize): KubernetesClusterSpecV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    DynamicLabels: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class WebTokenV3 {
    static wrap(ptr: usize): WebTokenV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class WebTokenSpecV3 {
    static wrap(ptr: usize): WebTokenSpecV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    User: usize;
    Token: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class GetWebSessionRequest {
    static wrap(ptr: usize): GetWebSessionRequest;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    User: usize;
    SessionID: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class DeleteWebSessionRequest {
    static wrap(ptr: usize): DeleteWebSessionRequest;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    User: usize;
    SessionID: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class GetWebTokenRequest {
    static wrap(ptr: usize): GetWebTokenRequest;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    User: usize;
    Token: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class DeleteWebTokenRequest {
    static wrap(ptr: usize): DeleteWebTokenRequest;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    User: usize;
    Token: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ResourceRequest {
    static wrap(ptr: usize): ResourceRequest;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Name: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ResourceWithSecretsRequest {
    static wrap(ptr: usize): ResourceWithSecretsRequest;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Name: usize;
    WithSecrets: bool;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ResourcesWithSecretsRequest {
    static wrap(ptr: usize): ResourcesWithSecretsRequest;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    WithSecrets: bool;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ResourceInNamespaceRequest {
    static wrap(ptr: usize): ResourceInNamespaceRequest;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Name: usize;
    Namespace: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ResourcesInNamespaceRequest {
    static wrap(ptr: usize): ResourcesInNamespaceRequest;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Namespace: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class OIDCConnectorV2 {
    static wrap(ptr: usize): OIDCConnectorV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class OIDCConnectorV2List {
    static wrap(ptr: usize): OIDCConnectorV2List;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    OIDCConnectors: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class OIDCConnectorSpecV2 {
    static wrap(ptr: usize): OIDCConnectorSpecV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    IssuerURL: usize;
    ClientID: usize;
    ClientSecret: usize;
    RedirectURL: usize;
    ACR: usize;
    Provider: usize;
    Display: usize;
    Scope: usize;
    Prompt: usize;
    ClaimsToRoles: usize;
    GoogleServiceAccountURI: usize;
    GoogleServiceAccount: usize;
    GoogleAdminEmail: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SAMLConnectorV2 {
    static wrap(ptr: usize): SAMLConnectorV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SAMLConnectorV2List {
    static wrap(ptr: usize): SAMLConnectorV2List;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    SAMLConnectors: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SAMLConnectorSpecV2 {
    static wrap(ptr: usize): SAMLConnectorSpecV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Issuer: usize;
    SSO: usize;
    Cert: usize;
    Display: usize;
    AssertionConsumerService: usize;
    Audience: usize;
    ServiceProviderIssuer: usize;
    EntityDescriptor: usize;
    EntityDescriptorURL: usize;
    AttributesToRoles: usize;
    SigningKeyPair: usize;
    Provider: usize;
    EncryptionKeyPair: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AttributeMapping {
    static wrap(ptr: usize): AttributeMapping;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Name: usize;
    Value: usize;
    Roles: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AsymmetricKeyPair {
    static wrap(ptr: usize): AsymmetricKeyPair;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    PrivateKey: usize;
    Cert: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class GithubConnectorV3 {
    static wrap(ptr: usize): GithubConnectorV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class GithubConnectorV3List {
    static wrap(ptr: usize): GithubConnectorV3List;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    GithubConnectors: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class GithubConnectorSpecV3 {
    static wrap(ptr: usize): GithubConnectorSpecV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    ClientID: usize;
    ClientSecret: usize;
    RedirectURL: usize;
    TeamsToLogins: usize;
    Display: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class TeamMapping {
    static wrap(ptr: usize): TeamMapping;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Organization: usize;
    Team: usize;
    Logins: usize;
    KubeGroups: usize;
    KubeUsers: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class TrustedClusterV2 {
    static wrap(ptr: usize): TrustedClusterV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class TrustedClusterV2List {
    static wrap(ptr: usize): TrustedClusterV2List;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    TrustedClusters: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class TrustedClusterSpecV2 {
    static wrap(ptr: usize): TrustedClusterSpecV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Enabled: bool;
    Roles: usize;
    Token: usize;
    ProxyAddress: usize;
    ReverseTunnelAddress: usize;
    RoleMap: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class LockV2 {
    static wrap(ptr: usize): LockV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class LockSpecV2 {
    static wrap(ptr: usize): LockSpecV2;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Target: usize;
    Message: usize;
    Expires: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class LockTarget {
    static wrap(ptr: usize): LockTarget;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    User: usize;
    Role: usize;
    Login: usize;
    Node: usize;
    MFADevice: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AddressCondition {
    static wrap(ptr: usize): AddressCondition;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    CIDR: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class NetworkRestrictionsSpecV4 {
    static wrap(ptr: usize): NetworkRestrictionsSpecV4;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Allow: usize;
    Deny: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class NetworkRestrictionsV4 {
    static wrap(ptr: usize): NetworkRestrictionsV4;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class WindowsDesktopServiceV3 {
    static wrap(ptr: usize): WindowsDesktopServiceV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Header: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class WindowsDesktopServiceSpecV3 {
    static wrap(ptr: usize): WindowsDesktopServiceSpecV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Addr: usize;
    TeleportVersion: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class WindowsDesktopV3 {
    static wrap(ptr: usize): WindowsDesktopV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Header: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class WindowsDesktopSpecV3 {
    static wrap(ptr: usize): WindowsDesktopSpecV3;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Addr: usize;
    Domain: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class RegisterUsingTokenRequest {
    static wrap(ptr: usize): RegisterUsingTokenRequest;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    HostID: usize;
    NodeName: usize;
    Role: usize;
    Token: usize;
    AdditionalPrincipals: usize;
    DNSNames: usize;
    PublicTLSKey: usize;
    PublicSSHKey: usize;
    RemoteAddr: usize;
    EC2IdentityDocument: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class RecoveryCodesV1 {
    static wrap(ptr: usize): RecoveryCodesV1;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Kind: usize;
    SubKind: usize;
    Version: usize;
    Metadata: usize;
    Spec: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class RecoveryCodesSpecV1 {
    static wrap(ptr: usize): RecoveryCodesSpecV1;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Codes: usize;
    Created: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class RecoveryCode {
    static wrap(ptr: usize): RecoveryCode;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    HashedCode: usize;
    IsUsed: bool;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
}
export namespace events {
  export enum EventAction {
    OBSERVED,
    DENIED,
  }
  export class Metadata {
    static wrap(ptr: usize): Metadata;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Index: i64;
    Type: usize;
    ID: usize;
    Code: usize;
    Time: usize;
    ClusterName: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SessionMetadata {
    static wrap(ptr: usize): SessionMetadata;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    SessionID: usize;
    WithMFA: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class UserMetadata {
    static wrap(ptr: usize): UserMetadata;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    User: usize;
    Login: usize;
    Impersonator: usize;
    AWSRoleARN: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ServerMetadata {
    static wrap(ptr: usize): ServerMetadata;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    ServerNamespace: usize;
    ServerID: usize;
    ServerHostname: usize;
    ServerAddr: usize;
    ServerLabels: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ConnectionMetadata {
    static wrap(ptr: usize): ConnectionMetadata;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    LocalAddr: usize;
    RemoteAddr: usize;
    Protocol: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class KubernetesClusterMetadata {
    static wrap(ptr: usize): KubernetesClusterMetadata;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    KubernetesCluster: usize;
    KubernetesUsers: usize;
    KubernetesGroups: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class KubernetesPodMetadata {
    static wrap(ptr: usize): KubernetesPodMetadata;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    KubernetesPodName: usize;
    KubernetesPodNamespace: usize;
    KubernetesContainerName: usize;
    KubernetesContainerImage: usize;
    KubernetesNodeName: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SessionStart {
    static wrap(ptr: usize): SessionStart;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Session: usize;
    Server: usize;
    Connection: usize;
    TerminalSize: usize;
    KubernetesCluster: usize;
    KubernetesPod: usize;
    InitialCommand: usize;
    SessionRecording: usize;
    AccessRequests: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SessionJoin {
    static wrap(ptr: usize): SessionJoin;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Session: usize;
    Server: usize;
    Connection: usize;
    KubernetesCluster: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SessionPrint {
    static wrap(ptr: usize): SessionPrint;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    ChunkIndex: i64;
    Data: usize;
    Bytes: i64;
    DelayMilliseconds: i64;
    Offset: i64;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SessionReject {
    static wrap(ptr: usize): SessionReject;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Server: usize;
    Connection: usize;
    Reason: usize;
    Maximum: i64;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class Resize {
    static wrap(ptr: usize): Resize;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Session: usize;
    Connection: usize;
    Server: usize;
    TerminalSize: usize;
    KubernetesCluster: usize;
    KubernetesPod: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SessionEnd {
    static wrap(ptr: usize): SessionEnd;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Session: usize;
    Connection: usize;
    Server: usize;
    EnhancedRecording: bool;
    Interactive: bool;
    Participants: usize;
    StartTime: usize;
    EndTime: usize;
    KubernetesCluster: usize;
    KubernetesPod: usize;
    InitialCommand: usize;
    SessionRecording: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class BPFMetadata {
    static wrap(ptr: usize): BPFMetadata;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    PID: u64;
    CgroupID: u64;
    Program: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class Status {
    static wrap(ptr: usize): Status;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Success: bool;
    Error: usize;
    UserMessage: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SessionCommand {
    static wrap(ptr: usize): SessionCommand;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Session: usize;
    Server: usize;
    BPF: usize;
    PPID: u64;
    Path: usize;
    Argv: usize;
    ReturnCode: i32;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SessionDisk {
    static wrap(ptr: usize): SessionDisk;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Session: usize;
    Server: usize;
    BPF: usize;
    Path: usize;
    Flags: i32;
    ReturnCode: i32;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SessionNetwork {
    static wrap(ptr: usize): SessionNetwork;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Session: usize;
    Server: usize;
    BPF: usize;
    SrcAddr: usize;
    DstAddr: usize;
    DstPort: i32;
    TCPVersion: i32;
    Operation: u32;
    Action: u32;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export enum SessionNetwork_NetworkOperation {
    CONNECT,
    SEND,
  }
  export class SessionData {
    static wrap(ptr: usize): SessionData;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Session: usize;
    Server: usize;
    Connection: usize;
    BytesTransmitted: u64;
    BytesReceived: u64;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SessionLeave {
    static wrap(ptr: usize): SessionLeave;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Session: usize;
    Server: usize;
    Connection: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class UserLogin {
    static wrap(ptr: usize): UserLogin;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Status: usize;
    Method: usize;
    IdentityAttributes: usize;
    MFADevice: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ResourceMetadata {
    static wrap(ptr: usize): ResourceMetadata;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Name: usize;
    Expires: usize;
    UpdatedBy: usize;
    TTL: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class UserCreate {
    static wrap(ptr: usize): UserCreate;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Resource: usize;
    Roles: usize;
    Connector: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class UserDelete {
    static wrap(ptr: usize): UserDelete;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Resource: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class UserPasswordChange {
    static wrap(ptr: usize): UserPasswordChange;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AccessRequestCreate {
    static wrap(ptr: usize): AccessRequestCreate;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Resource: usize;
    Roles: usize;
    RequestID: usize;
    RequestState: usize;
    Delegator: usize;
    Reason: usize;
    Annotations: usize;
    Reviewer: usize;
    ProposedState: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class PortForward {
    static wrap(ptr: usize): PortForward;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Connection: usize;
    Status: usize;
    Addr: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class X11Forward {
    static wrap(ptr: usize): X11Forward;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Connection: usize;
    Status: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class CommandMetadata {
    static wrap(ptr: usize): CommandMetadata;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Command: usize;
    ExitCode: usize;
    Error: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class Exec {
    static wrap(ptr: usize): Exec;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Connection: usize;
    Session: usize;
    Server: usize;
    Command: usize;
    KubernetesCluster: usize;
    KubernetesPod: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SCP {
    static wrap(ptr: usize): SCP;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Connection: usize;
    Session: usize;
    Server: usize;
    Command: usize;
    Path: usize;
    Action: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class Subsystem {
    static wrap(ptr: usize): Subsystem;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Connection: usize;
    Name: usize;
    Error: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class ClientDisconnect {
    static wrap(ptr: usize): ClientDisconnect;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Connection: usize;
    Server: usize;
    Reason: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AuthAttempt {
    static wrap(ptr: usize): AuthAttempt;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Connection: usize;
    Status: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class UserTokenCreate {
    static wrap(ptr: usize): UserTokenCreate;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    Resource: usize;
    User: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class RoleCreate {
    static wrap(ptr: usize): RoleCreate;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    Resource: usize;
    User: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class RoleDelete {
    static wrap(ptr: usize): RoleDelete;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    Resource: usize;
    User: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class TrustedClusterCreate {
    static wrap(ptr: usize): TrustedClusterCreate;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    Resource: usize;
    User: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class TrustedClusterDelete {
    static wrap(ptr: usize): TrustedClusterDelete;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    Resource: usize;
    User: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class TrustedClusterTokenCreate {
    static wrap(ptr: usize): TrustedClusterTokenCreate;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    Resource: usize;
    User: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class GithubConnectorCreate {
    static wrap(ptr: usize): GithubConnectorCreate;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    Resource: usize;
    User: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class GithubConnectorDelete {
    static wrap(ptr: usize): GithubConnectorDelete;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    Resource: usize;
    User: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class OIDCConnectorCreate {
    static wrap(ptr: usize): OIDCConnectorCreate;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    Resource: usize;
    User: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class OIDCConnectorDelete {
    static wrap(ptr: usize): OIDCConnectorDelete;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    Resource: usize;
    User: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SAMLConnectorCreate {
    static wrap(ptr: usize): SAMLConnectorCreate;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    Resource: usize;
    User: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SAMLConnectorDelete {
    static wrap(ptr: usize): SAMLConnectorDelete;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    Resource: usize;
    User: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class KubeRequest {
    static wrap(ptr: usize): KubeRequest;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Connection: usize;
    Server: usize;
    RequestPath: usize;
    Verb: usize;
    ResourceAPIGroup: usize;
    ResourceNamespace: usize;
    ResourceKind: usize;
    ResourceName: usize;
    ResponseCode: i32;
    Kubernetes: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AppMetadata {
    static wrap(ptr: usize): AppMetadata;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    AppURI: usize;
    AppPublicAddr: usize;
    AppLabels: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AppCreate {
    static wrap(ptr: usize): AppCreate;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Resource: usize;
    App: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AppUpdate {
    static wrap(ptr: usize): AppUpdate;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Resource: usize;
    App: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AppDelete {
    static wrap(ptr: usize): AppDelete;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Resource: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AppSessionStart {
    static wrap(ptr: usize): AppSessionStart;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Session: usize;
    Server: usize;
    Connection: usize;
    PublicAddr: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AppSessionChunk {
    static wrap(ptr: usize): AppSessionChunk;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Session: usize;
    Server: usize;
    Connection: usize;
    SessionChunkID: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class AppSessionRequest {
    static wrap(ptr: usize): AppSessionRequest;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    StatusCode: u32;
    Path: usize;
    RawQuery: usize;
    Method: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class DatabaseMetadata {
    static wrap(ptr: usize): DatabaseMetadata;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    DatabaseService: usize;
    DatabaseProtocol: usize;
    DatabaseURI: usize;
    DatabaseName: usize;
    DatabaseUser: usize;
    DatabaseLabels: usize;
    DatabaseAWSRegion: usize;
    DatabaseAWSRedshiftClusterID: usize;
    DatabaseGCPProjectID: usize;
    DatabaseGCPInstanceID: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class DatabaseCreate {
    static wrap(ptr: usize): DatabaseCreate;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Resource: usize;
    Database: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class DatabaseUpdate {
    static wrap(ptr: usize): DatabaseUpdate;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Resource: usize;
    Database: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class DatabaseDelete {
    static wrap(ptr: usize): DatabaseDelete;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Resource: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class DatabaseSessionStart {
    static wrap(ptr: usize): DatabaseSessionStart;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Session: usize;
    Server: usize;
    Connection: usize;
    Status: usize;
    Database: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class DatabaseSessionQuery {
    static wrap(ptr: usize): DatabaseSessionQuery;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Session: usize;
    Database: usize;
    DatabaseQuery: usize;
    DatabaseQueryParameters: usize;
    Status: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class WindowsDesktopSessionStart {
    static wrap(ptr: usize): WindowsDesktopSessionStart;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Session: usize;
    Connection: usize;
    Status: usize;
    WindowsDesktopService: usize;
    DesktopAddr: usize;
    Domain: usize;
    WindowsUser: usize;
    DesktopLabels: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class DatabaseSessionEnd {
    static wrap(ptr: usize): DatabaseSessionEnd;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Session: usize;
    Database: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class MFADeviceMetadata {
    static wrap(ptr: usize): MFADeviceMetadata;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    DeviceName: usize;
    DeviceID: usize;
    DeviceType: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class MFADeviceAdd {
    static wrap(ptr: usize): MFADeviceAdd;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Device: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class MFADeviceDelete {
    static wrap(ptr: usize): MFADeviceDelete;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Device: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class BillingInformationUpdate {
    static wrap(ptr: usize): BillingInformationUpdate;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class BillingCardCreate {
    static wrap(ptr: usize): BillingCardCreate;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class BillingCardDelete {
    static wrap(ptr: usize): BillingCardDelete;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class LockCreate {
    static wrap(ptr: usize): LockCreate;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    Resource: usize;
    User: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class LockDelete {
    static wrap(ptr: usize): LockDelete;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    Resource: usize;
    User: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class RecoveryCodeGenerate {
    static wrap(ptr: usize): RecoveryCodeGenerate;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class RecoveryCodeUsed {
    static wrap(ptr: usize): RecoveryCodeUsed;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Status: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class WindowsDesktopSessionEnd {
    static wrap(ptr: usize): WindowsDesktopSessionEnd;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    User: usize;
    Session: usize;
    WindowsDesktopService: usize;
    DesktopAddr: usize;
    Domain: usize;
    WindowsUser: usize;
    DesktopLabels: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class OneOf {
    static wrap(ptr: usize): OneOf;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    UserLogin: usize;
    UserCreate: usize;
    UserDelete: usize;
    UserPasswordChange: usize;
    SessionStart: usize;
    SessionJoin: usize;
    SessionPrint: usize;
    SessionReject: usize;
    Resize: usize;
    SessionEnd: usize;
    SessionCommand: usize;
    SessionDisk: usize;
    SessionNetwork: usize;
    SessionData: usize;
    SessionLeave: usize;
    PortForward: usize;
    X11Forward: usize;
    SCP: usize;
    Exec: usize;
    Subsystem: usize;
    ClientDisconnect: usize;
    AuthAttempt: usize;
    AccessRequestCreate: usize;
    UserTokenCreate: usize;
    RoleCreate: usize;
    RoleDelete: usize;
    TrustedClusterCreate: usize;
    TrustedClusterDelete: usize;
    TrustedClusterTokenCreate: usize;
    GithubConnectorCreate: usize;
    GithubConnectorDelete: usize;
    OIDCConnectorCreate: usize;
    OIDCConnectorDelete: usize;
    SAMLConnectorCreate: usize;
    SAMLConnectorDelete: usize;
    KubeRequest: usize;
    AppSessionStart: usize;
    AppSessionChunk: usize;
    AppSessionRequest: usize;
    DatabaseSessionStart: usize;
    DatabaseSessionEnd: usize;
    DatabaseSessionQuery: usize;
    SessionUpload: usize;
    MFADeviceAdd: usize;
    MFADeviceDelete: usize;
    BillingInformationUpdate: usize;
    BillingCardCreate: usize;
    BillingCardDelete: usize;
    LockCreate: usize;
    LockDelete: usize;
    RecoveryCodeGenerate: usize;
    RecoveryCodeUsed: usize;
    DatabaseCreate: usize;
    DatabaseUpdate: usize;
    DatabaseDelete: usize;
    AppCreate: usize;
    AppUpdate: usize;
    AppDelete: usize;
    WindowsDesktopSessionStart: usize;
    WindowsDesktopSessionEnd: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class StreamStatus {
    static wrap(ptr: usize): StreamStatus;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    UploadID: usize;
    LastEventIndex: i64;
    LastUploadTime: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
  export class SessionUpload {
    static wrap(ptr: usize): SessionUpload;
    valueOf(): usize;
    static decodeArrayBuffer(buf: usize): usize;
    static decode(view: usize): usize;
    Metadata: usize;
    SessionMetadata: usize;
    UID: usize;
    SessionURL: usize;
    size(): u32;
    encodeDataView(): usize;
    encode(encoder?: usize): usize;
    constructor();
  }
}
export const memory: WebAssembly.Memory;
export const __setArgumentsLength: ((n: i32) => void) | undefined;
