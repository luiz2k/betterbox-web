import { JWT, encode, getToken } from "next-auth/jwt";
import { NextMiddleware, NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const SESSION_TIMEOUT = 60 * 60 * 24 * 30; // 30 days
export const SESSION_SECURE = process.env.NEXTAUTH_URL?.startsWith("https://");
export const SESSION_COOKIE = SESSION_SECURE
  ? "__Secure-next-auth.session-token"
  : "next-auth.session-token";

export function updateCookie(
  sessionToken: string | null,
  request: NextRequest,
  response: NextResponse,
): NextResponse {
  if (sessionToken) {
    request.cookies.set(SESSION_COOKIE, sessionToken);

    response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    response.cookies.set(SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      maxAge: SESSION_TIMEOUT,
      secure: SESSION_SECURE,
      sameSite: "lax",
    });
  } else {
    response.cookies.delete(SESSION_COOKIE);
    NextResponse.redirect(new URL("/", request.url));

    return response;
  }

  return response;
}

const refreshToken = async (token: JWT): Promise<JWT> => {
  const apiBaseURL = process.env.API_BASE_URL;

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: token.refreshToken }),
  };

  try {
    const response: Response = await fetch(
      `${apiBaseURL}/auth/refreshToken`,
      options,
    );

    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();

    return {
      ...token,
      ...data,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const middleware: NextMiddleware = async (request: NextRequest) => {
  const token: JWT | null = await getToken({ req: request });

  let response = NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const accessTokenIsValid: boolean =
    Date.now() < Date.parse(token.accessTokenExpiresAt);

  if (!accessTokenIsValid) {
    console.log("Expirou!");

    try {
      const newSessionToken = await encode({
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: SESSION_TIMEOUT,
        token: await refreshToken(token),
      });

      response = updateCookie(newSessionToken, request, response);
    } catch (error) {
      console.log("Error refreshing token: ", error);
      return updateCookie(null, request, response);
    }
  }

  return response;
};

export const config = {
  matcher: [
    "/perfil",
    "/perfil/favoritos",
    "/perfil/assistidos",
    "/perfil/configuracoes",
  ],
};
