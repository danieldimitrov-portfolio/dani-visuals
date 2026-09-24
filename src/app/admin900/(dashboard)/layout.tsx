import Link from "next/link";
import { LayoutDashboard, FolderKanban, Settings, Mail, LogOut, ExternalLink } from "lucide-react";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

const NAV = [
  { href: "/admin900", label: "Начало", icon: LayoutDashboard },
  { href: "/admin900/projects", label: "Проекти", icon: FolderKanban },
  { href: "/admin900/settings", label: "Настройки", icon: Settings },
  { href: "/admin900/messages", label: "Съобщения", icon: Mail },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/admin900/login");

  return (
    <div className="flex min-h-screen bg-black text-white">
      <aside className="hidden w-64 flex-col border-r border-white/10 p-6 md:flex">
        <p className="mb-8 font-heading text-lg font-black uppercase tracking-wide">Admin</p>
        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover-purple flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 font-body text-sm text-white"
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          target="_blank"
          className="hover-purple mb-2 flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 font-body text-sm text-white"
        >
          <ExternalLink size={16} />
          Виж сайта
        </Link>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin900/login" });
          }}
        >
          <button className="hover-purple flex w-full items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 font-body text-sm text-white">
            <LogOut size={16} />
            Изход
          </button>
        </form>
      </aside>

      <main className="flex-1 overflow-x-hidden p-6 md:p-10">{children}</main>
    </div>
  );
}
