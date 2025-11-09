export interface Token {
  access_token: string;   // JWT access token
  refresh_token: string;  // JWT refresh token
  token_type: string;     // Token type, usually "bearer"
}
