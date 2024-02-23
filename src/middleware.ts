export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/perfil",
    "/perfil/favoritos",
    "/perfil/assistidos",
    "/perfil/configuracoes",
  ],
};
