import options from "@/app/api/auth/[...nextauth]/options";
import ChangeEmail from "@/components/SettingsForms/ChangeEmail/ChangeEmail";
import ChangePassword from "@/components/SettingsForms/ChangePassword/ChangePassword";
import ChangeUsername from "@/components/SettingsForms/ChangeUsername/ChangeUsername";
import { Metadata } from "next";
import { Session, getServerSession } from "next-auth";

export const metadata: Metadata = { title: "betterbox - Configurações" };

export default async function Settings() {
  const apiBaseURL: string = process.env.API_BASE_URL as string;
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

      <hr className="m-auto max-w-xl" />

      <ChangeUsername apiURL={apiBaseURL} accessToken={session?.accessToken} />

      <hr className="m-auto max-w-xl" />

      <ChangeEmail apiURL={apiBaseURL} accessToken={session?.accessToken} />

      <hr className="m-auto max-w-xl" />

      <ChangePassword apiURL={apiBaseURL} accessToken={session?.accessToken} />
    </section>
  );
}
