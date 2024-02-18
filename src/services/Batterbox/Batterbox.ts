import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import nextAuthOptions from "@/app/api/auth/[...nextauth]/options";

import { SignIn, SignUp } from "./Betterbox";

const apiBaseURL: string = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export const signIn = async (data: SignIn) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  try {
    const response: Response = await fetch(
      `${apiBaseURL}/auth/signIn`,
      options,
    );

    if (response.status !== 200) throw new Error("Email ou senha inválido.");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signUp = async (data: SignUp) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  try {
    const response: Response = await fetch(
      `${apiBaseURL}/auth/signUp`,
      options,
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signOut = () => {};

export const refreshToken = async (refreshToken: string) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  };

  try {
    const response: Response = await fetch(
      `${apiBaseURL}/auth/refreshToken`,
      options,
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserByAccessToken = async (accessToken: string) => {
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  try {
    const response: Response = await fetch(
      `${apiBaseURL}/user/getUserById`,
      options,
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const changeUsername = async () => {};
export const changeEmail = async () => {};
export const changePassword = async () => {};

export const addFavorite = async () => {};
export const removeFavorite = async () => {};

export const addWatched = async () => {};
export const removeWatched = async () => {};