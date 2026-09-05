export interface AdminUser {
  id: string;
  username: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminAuthResponse {
  admin: AdminUser;
}

export interface AdminLogoutResponse {
  message: string;
}
