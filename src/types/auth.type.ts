import { User } from './user.type'
import { SuccessResponse } from './utils.type'

export type AuthResponse = SuccessResponse<{
  accessToken: string;
  refresh_token: string;
  expires_refresh_token: number;
  expires: number;
  userName: any;
}>;

export type RefreshTokenReponse = SuccessResponse<{ access_token: string }>
