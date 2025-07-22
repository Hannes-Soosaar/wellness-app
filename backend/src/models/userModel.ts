export interface userData {
  id: string;
  email: string;
  password: string;
  is_verified: boolean;
  last_login: Date | null;
  created_at: Date;
  verification_token: string | null;
  password_reset_token: string | null;
  password_reset_expires: Date | null;
  role: string;
  status: string;
}
