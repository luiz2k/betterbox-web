import options from "@/app/api/auth/[...nextauth]/options";
import ChangeEmail from "@/components/SettingsForms/ChangeEmail/ChangeEmail";
import ChangePassword from "@/components/SettingsForms/ChangePassword/ChangePassword";
import ChangeUsername from "@/components/SettingsForms/ChangeUsername/ChangeUsername";
import { Session, getServerSession } from "next-auth";
import { z } from "zod";

export default async function Settings() {
  const session: Session | null = await getServerSession(options);

  return (
    <section className="space-y-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold uppercase">Configurções</h1>
        {session && (
          <p className="text-lg text-color-3">
            Olá <strong>{session.user?.username}</strong>, aqui você pode
            alterar as informações de sua conta.
          </p>
        )}
      </header>

      <ChangeUsername accessToken={session?.accessToken} />

      <hr className="m-auto max-w-xl" />

      <ChangeEmail accessToken={session?.accessToken} />

      <hr className="m-auto max-w-xl" />

      <ChangePassword accessToken={session?.accessToken} />
    </section>
  );
}
