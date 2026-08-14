"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authService } from "@/services/auth.service";
import {
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from "@/lib/validations/auth";
import type { AuthData, User } from "@/types/api";

export interface ActionState<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

const COOKIE_NAME = "auth_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/**
 * Helper to normalize input data from either a plain object or FormData.
 */
function normalizeInput(input: unknown): unknown {
  if (typeof FormData !== "undefined" && input instanceof FormData) {
    return Object.fromEntries(input.entries());
  }
  return input;
}

/**
 * Register Server Action
 * Validates input with registerSchema, calls authService.register,
 * sets secure httpOnly auth_token cookie on success, and revalidates '/'.
 */
export async function registerAction(
  formData: RegisterInput
): Promise<ActionState<AuthData>> {
  try {
    const rawData = normalizeInput(formData);
    const validationResult = registerSchema.safeParse(rawData);

    if (!validationResult.success) {
      const firstErrorMessage =
        validationResult.error.issues[0]?.message || "Validation failed";
      return {
        success: false,
        message: firstErrorMessage,
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const response = await authService.register(validationResult.data);

    if (!response.success) {
      return {
        success: false,
        message: response.message || "Registration failed",
      };
    }

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, response.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });

    revalidatePath("/");

    return {
      success: true,
      message: response.message || "Registration successful",
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Login Server Action
 * Validates input with loginSchema, calls authService.login,
 * sets secure httpOnly auth_token cookie on success, and revalidates '/'.
 */
export async function loginAction(
  formData: LoginInput
): Promise<ActionState<AuthData>> {
  try {
    const rawData = normalizeInput(formData);
    const validationResult = loginSchema.safeParse(rawData);

    if (!validationResult.success) {
      const firstErrorMessage =
        validationResult.error.issues[0]?.message || "Validation failed";
      return {
        success: false,
        message: firstErrorMessage,
        errors: validationResult.error.flatten().fieldErrors,
      };
    }

    const response = await authService.login(validationResult.data);

    if (!response.success) {
      return {
        success: false,
        message: response.message || "Login failed",
      };
    }

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, response.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });

    revalidatePath("/");

    return {
      success: true,
      message: response.message || "Login successful",
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

/**
 * Logout Server Action
 * Deletes auth_token cookie and redirects to /login.
 */
export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  revalidatePath("/");
  redirect("/login");
}

/**
 * Get Current User Server Action
 * Reads auth_token from cookies(), calls authService.getProfile,
 * and returns the user or null.
 */
export async function getCurrentUserAction(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    const response = await authService.getProfile(token);

    if (!response.success) {
      return null;
    }

    return response.data;
  } catch {
    return null;
  }
}
