export interface UserInfo {
  id: number;             // User ID
  email: string;          // User's email address
  full_name?: string;     // User's full name (optional)
  created_at: string;     // Account creation timestamp (ISO string)
}
