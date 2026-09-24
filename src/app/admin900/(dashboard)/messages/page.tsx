import { Mail, MailOpen, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { markMessageReadAction, deleteMessageAction } from "@/lib/actions";
import { cardClass, buttonSecondaryClass, buttonDangerClass } from "@/lib/admin-ui";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";

export default async function MessagesPage() {
  let messages: Awaited<ReturnType<typeof prisma.contactSubmission.findMany>> = [];
  let dbReachable = true;
  try {
    messages = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    dbReachable = false;
  }

  return (
    <div className="flex max-w-3xl flex-col gap-6 pb-20">
      <h1 className="font-heading text-2xl font-black uppercase text-white">Съобщения</h1>

      {!dbReachable && (
        <div className={`${cardClass} border-red-500/30 bg-red-500/5`}>
          <p className="font-body text-sm text-red-300">Базата данни не е достъпна.</p>
        </div>
      )}

      {dbReachable && messages.length === 0 && (
        <p className="font-body text-sm text-muted">Все още няма съобщения от контактната форма.</p>
      )}

      {messages.map((m) => {
        const toggleRead = markMessageReadAction.bind(null, m.id, !m.read);
        const del = deleteMessageAction.bind(null, m.id);
        return (
          <div
            key={m.id}
            className={`${cardClass} flex flex-col gap-3 ${m.read ? "" : "border-accent/50"}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-heading text-sm font-black text-white">{m.name}</p>
                <p className="font-body text-xs text-muted">
                  {m.email} {m.phone && `· ${m.phone}`}
                </p>
              </div>
              <p className="font-body text-xs text-muted">
                {new Date(m.createdAt).toLocaleString("bg-BG")}
              </p>
            </div>
            <p className="whitespace-pre-line font-body text-sm text-white">{m.message}</p>
            <div className="flex gap-3">
              <form action={toggleRead}>
                <button type="submit" className={buttonSecondaryClass}>
                  <span className="flex items-center gap-2">
                    {m.read ? <Mail size={14} /> : <MailOpen size={14} />}
                    {m.read ? "Маркирай като непрочетено" : "Маркирай като прочетено"}
                  </span>
                </button>
              </form>
              <form action={del}>
                <ConfirmSubmitButton confirmMessage="Изтриване на съобщението?" className={buttonDangerClass}>
                  <span className="flex items-center gap-2">
                    <Trash2 size={14} /> Изтрий
                  </span>
                </ConfirmSubmitButton>
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}
