enum AuthUserNameStatus {
  Active = "ACTIVE",
}

enum AuthUserRole {
  Member = "member",
}

interface AuthUserRegistration {
  applicationId: string;
  id: string;
  insertInstant: Date;
  lastLoginInstant: Date;
  lastUpdateInstant: Date;
  roles: Array<AuthUserRole>;
  usernameStatus: AuthUserNameStatus;
  verified: boolean;
}

export interface AuthUser {
  active: boolean;
  connectorId: string;
  email: string;
  fullName: string;
  id: string;
  insertInstant: Date;
  lastLoginInstant: Date;
  lastUpdateInstant: Date;
  mobilePhone: string;
  passwordChangeRequired: boolean;
  passwordLastUpdateInstant: Date;
  registrations?: Array<AuthUserRegistration>;
  tenantId: string;
  twoFactor: unknown;
  usernameStatus: AuthUserNameStatus;
  verified: boolean;
}

export interface AuthLoginResponse {
  refreshToken: string;
  token: string;
  tokenExpirationInstant: Date;
  user: AuthUser;
}

export interface AuthLoginRequest {
  email: string;
  password: string;
}

export interface AuthRegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}

export interface AuthRegisterResponse extends AuthLoginResponse {
  registration: AuthUserRegistration;
}

export interface AuthOnboardResponse extends Omit<AuthLoginResponse, "user"> {
  registrations?: Array<AuthUserRegistration>;
}
