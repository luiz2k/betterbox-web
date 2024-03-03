"use client";

import { Session } from "next-auth";
import { getSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const VerifyAutentication = ({ children }: { children: React.ReactNode }) => {
  const pathName: string = usePathname();

  const privateRoutes: string[] = [
    "/perfil",
    "/perfil/favoritos",
    "/perfil/assistidos",
    "/perfil/configuracoes",
  ];

  const thisRouteIsPrivate: boolean = privateRoutes.includes(pathName);

  useEffect(() => {
    const verifySession = async () => {
      const session: Session | null = await getSession();

      if (thisRouteIsPrivate && !session) signOut({ callbackUrl: "/" });
    };

    verifySession();
  }, [pathName, thisRouteIsPrivate]);

  return <>{children}</>;
};

export default VerifyAutentication;
