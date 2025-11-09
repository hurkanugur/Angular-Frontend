export interface UserCreate {
  email: string;          // User's email address
  password: string;       // User's password
  full_name?: string;     // User's full name (optional)
}
