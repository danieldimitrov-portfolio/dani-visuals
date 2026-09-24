import { createProjectAction } from "@/lib/actions";
import { inputClass, labelClass, cardClass } from "@/lib/admin-ui";

export default function NewProjectPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl font-black uppercase text-white">Нов проект</h1>

      <form action={createProjectAction} className={`${cardClass} flex max-w-lg flex-col gap-4`}>
        <div>
          <label className={labelClass}>Заглавие</label>
          <input name="title" required className={inputClass} placeholder="Напр. Balkan Nextalgia" />
        </div>
        <div>
          <label className={labelClass}>Slug (по избор, генерира се автоматично)</label>
          <input name="slug" className={inputClass} placeholder="balkan-nextalgia" />
        </div>
        <div>
          <label className={labelClass}>Категория</label>
          <select name="category" className={inputClass} defaultValue="MAIN">
            <option value="MAIN">Основен проект (VJ визуализация)</option>
            <option value="OTHER">Друг проект (галерия)</option>
            <option value="UPCOMING">Предстоящ проект</option>
          </select>
        </div>
        <button type="submit" className="btn-primary self-start">
          Създай и редактирай
        </button>
      </form>
    </div>
  );
}
