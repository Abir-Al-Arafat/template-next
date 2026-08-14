import { apiClient } from "@/lib/api-client";
import type { ApiResponse, AuthData, User } from "@/types/api";
import type { LoginInput, RegisterInput } from "@/lib/validations/auth";

export async function register(
  payload: RegisterInput
): Promise<ApiResponse<AuthData>> {
  return apiClient<AuthData>("/api/v1/auth/register", {
    method: "POST",
    body: payload,
  });
}

export async function login(
  payload: LoginInput
): Promise<ApiResponse<AuthData>> {
  return apiClient<AuthData>("/api/v1/auth/login", {
    method: "POST",
    body: payload,
  });
}

export async function getProfile(token: string): Promise<ApiResponse<User>> {
  return apiClient<User>("/api/v1/users/profile", {
    method: "GET",
    token,
  });
}

export async function healthCheck(): Promise<ApiResponse<{ status: string }>> {
  return apiClient<{ status: string }>("/", {
    method: "GET",
  });
}

export const authService = {
  register,
  login,
  getProfile,
  healthCheck,
};
