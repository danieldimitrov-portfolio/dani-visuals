import { Trash2, Plus } from "lucide-react";
import { getSiteSettings } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import {
  updateSiteSettingsAction,
  addSocialAction,
  updateSocialAction,
  deleteSocialAction,
} from "@/lib/actions";
import { inputClass, labelClass, cardClass, buttonDangerClass } from "@/lib/admin-ui";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import { SOCIAL_ICON_MAP } from "@/lib/social-icons";

export default async function SettingsPage() {
  const settings = await getSiteSettings();
  let socials: Awaited<ReturnType<typeof prisma.socialLink.findMany>> = [];
  try {
    socials = await prisma.socialLink.findMany({ orderBy: { order: "asc" } });
  } catch {
    // handled by empty list below
  }

  const iconKeys = Object.keys(SOCIAL_ICON_MAP);

  return (
    <div className="flex max-w-3xl flex-col gap-8 pb-20">
      <h1 className="font-heading text-2xl font-black uppercase text-white">Настройки</h1>

      <form action={updateSiteSettingsAction} className={`${cardClass} flex flex-col gap-4`}>
        <h2 className="font-heading text-sm font-black uppercase text-accent">
          Начална страница
        </h2>
        <div>
          <label className={labelClass}>Заглавие (име / бранд)</label>
          <input name="heroTitle" defaultValue={settings.heroTitle} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Подзаглавие</label>
          <textarea
            name="heroSubtitle"
            defaultValue={settings.heroSubtitle}
            rows={3}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Текст на бутона</label>
          <input name="heroCtaLabel" defaultValue={settings.heroCtaLabel} className={inputClass} />
        </div>

        <h2 className="mt-4 font-heading text-sm font-black uppercase text-accent">Контакти</h2>
        <div>
          <label className={labelClass}>Въвеждащ текст за контактната секция</label>
          <textarea
            name="contactIntro"
            defaultValue={settings.contactIntro}
            rows={3}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Имейл</label>
            <input name="contactEmail" defaultValue={settings.contactEmail} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Телефон</label>
            <input name="contactPhone" defaultValue={settings.contactPhone} className={inputClass} />
          </div>
        </div>

        <h2 className="mt-4 font-heading text-sm font-black uppercase text-accent">SEO</h2>
        <div>
          <label className={labelClass}>SEO заглавие</label>
          <input name="seoTitle" defaultValue={settings.seoTitle} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>SEO описание</label>
          <textarea
            name="seoDescription"
            defaultValue={settings.seoDescription}
            rows={3}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Open Graph снимка (URL)</label>
          <input name="ogImageUrl" defaultValue={settings.ogImageUrl} className={inputClass} />
        </div>

        <button type="submit" className="btn-primary self-start">
          Запази настройките
        </button>
      </form>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-sm font-black uppercase text-accent">
          Социални мрежи
        </h2>

        {socials.map((s) => {
          const update = updateSocialAction.bind(null, s.id);
          const del = deleteSocialAction.bind(null, s.id);
          return (
            <div key={s.id} className={`${cardClass} flex flex-col gap-4`}>
              <form action={update} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Платформа</label>
                  <input name="platform" defaultValue={s.platform} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Икона</label>
                  <select name="iconKey" defaultValue={s.iconKey} className={inputClass}>
                    {iconKeys.map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>URL</label>
                  <input name="url" defaultValue={s.url} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Ред</label>
                  <input name="order" type="number" defaultValue={s.order} className={inputClass} />
                </div>
                <label className="flex items-center gap-2 self-end font-body text-sm text-white">
                  <input type="checkbox" name="visible" defaultChecked={s.visible} />
                  Видима
                </label>
                <div className="sm:col-span-2">
                  <button type="submit" className="btn-primary">
                    Запази
                  </button>
                </div>
              </form>
              <form action={del}>
                <ConfirmSubmitButton confirmMessage="Изтриване на тази мрежа?" className={buttonDangerClass}>
                  <span className="flex items-center gap-2">
                    <Trash2 size={14} /> Изтрий
                  </span>
                </ConfirmSubmitButton>
              </form>
            </div>
          );
        })}

        <form action={addSocialAction} className={`${cardClass} flex flex-col gap-4 border-dashed`}>
          <h3 className="font-body text-xs uppercase tracking-widest text-muted">Нова мрежа</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Платформа</label>
              <input name="platform" required className={inputClass} placeholder="Instagram" />
            </div>
            <div>
              <label className={labelClass}>Икона</label>
              <select name="iconKey" className={inputClass} defaultValue={iconKeys[0]}>
                {iconKeys.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>URL</label>
              <input name="url" required className={inputClass} placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className={labelClass}>Ред</label>
              <input name="order" type="number" defaultValue={socials.length} className={inputClass} />
            </div>
            <label className="flex items-center gap-2 self-end font-body text-sm text-white">
              <input type="checkbox" name="visible" defaultChecked />
              Видима
            </label>
          </div>
          <button type="submit" className="btn-primary self-start">
            <Plus size={16} /> Добави
          </button>
        </form>
      </div>
    </div>
  );
}
