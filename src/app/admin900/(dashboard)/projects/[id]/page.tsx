import { notFound } from "next/navigation";
import { Trash2, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import {
  updateProjectAction,
  deleteProjectAction,
  addSectionAction,
  updateSectionAction,
  deleteSectionAction,
  addMediaAction,
  deleteMediaAction,
} from "@/lib/actions";
import { inputClass, labelClass, cardClass, buttonDangerClass } from "@/lib/admin-ui";
import MediaUrlInput from "@/components/admin/MediaUrlInput";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      sections: { orderBy: { order: "asc" } },
      media: { orderBy: { order: "asc" } },
    },
  });

  if (!project) notFound();

  const previewMedia = project.media.filter((m) => m.placement === "PREVIEW");
  const galleryMedia = project.media.filter((m) => m.placement === "GALLERY");
  const updateProject = updateProjectAction.bind(null, project.id);
  const deleteProject = deleteProjectAction.bind(null, project.id);
  const addSection = addSectionAction.bind(null, project.id);
  const addMedia = addMediaAction.bind(null, project.id);

  return (
    <div className="flex max-w-4xl flex-col gap-8 pb-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-black uppercase text-white">
          {project.title}
        </h1>
        <form action={deleteProject}>
          <ConfirmSubmitButton
            confirmMessage="Сигурни ли сте, че искате да изтриете този проект? Това действие е необратимо."
            className={buttonDangerClass}
          >
            <span className="flex items-center gap-2">
              <Trash2 size={14} /> Изтрий проекта
            </span>
          </ConfirmSubmitButton>
        </form>
      </div>

      {/* Main details */}
      <form action={updateProject} className={`${cardClass} flex flex-col gap-4`}>
        <h2 className="font-heading text-sm font-black uppercase text-accent">Детайли</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Заглавие</label>
            <input name="title" defaultValue={project.title} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Slug</label>
            <input name="slug" defaultValue={project.slug} required className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Подзаглавие</label>
          <input name="subtitle" defaultValue={project.subtitle} className={inputClass} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Категория</label>
            <select name="category" defaultValue={project.category} className={inputClass}>
              <option value="MAIN">Основен проект</option>
              <option value="OTHER">Друг проект</option>
              <option value="UPCOMING">Предстоящ</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Ред (подредба)</label>
            <input name="order" type="number" defaultValue={project.order} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Акцентен цвят</label>
            <input
              name="accentColor"
              type="color"
              defaultValue={project.accentColor}
              className={`${inputClass} h-10 p-1`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Дата на събитието</label>
            <input name="eventDate" defaultValue={project.eventDate} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Локация</label>
            <input name="location" defaultValue={project.location} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Кратко описание (за секцията на началната страница)</label>
          <textarea
            name="summary"
            defaultValue={project.summary}
            rows={3}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Пълно описание (за страницата &quot;See more&quot;)</label>
          <textarea
            name="fullDescription"
            defaultValue={project.fullDescription}
            rows={6}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Постер снимка (URL)</label>
          <MediaUrlInput name="posterImageUrl" defaultValue={project.posterImageUrl} />
        </div>

        <div>
          <label className={labelClass}>Пълно видео от концерта (за страницата &quot;See more&quot;)</label>
          <MediaUrlInput name="fullVideoUrl" defaultValue={project.fullVideoUrl} />
        </div>

        <label className="flex items-center gap-2 font-body text-sm text-white">
          <input type="checkbox" name="published" defaultChecked={project.published} />
          Публикуван (видим в сайта)
        </label>

        <button type="submit" className="btn-primary self-start">
          Запази промените
        </button>
      </form>

      {/* Sections */}
      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-sm font-black uppercase text-accent">
          Секции / символика ({project.sections.length})
        </h2>

        {project.sections.map((section) => {
          const updateSection = updateSectionAction.bind(null, section.id, project.id);
          const deleteSection = deleteSectionAction.bind(null, section.id, project.id);
          return (
            <div key={section.id} className={`${cardClass} flex flex-col gap-4`}>
              <form action={updateSection} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Заглавие (напр. име на изпълнител)</label>
                    <input name="title" defaultValue={section.title} required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Подзаглавие (напр. продължителност)</label>
                    <input name="subtitle" defaultValue={section.subtitle} className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className={labelClass}>Тема</label>
                    <input name="theme" defaultValue={section.theme} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Цветове</label>
                    <input name="colors" defaultValue={section.colors} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Ред</label>
                    <input name="order" type="number" defaultValue={section.order} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Съдържание / описание</label>
                  <textarea
                    name="content"
                    defaultValue={section.content}
                    rows={5}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Видео за тази секция (по избор)</label>
                  <MediaUrlInput name="videoUrl" defaultValue={section.videoUrl} />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="btn-primary">Запази</button>
                </div>
              </form>
              <form action={deleteSection}>
                <ConfirmSubmitButton
                  confirmMessage="Изтриване на тази секция?"
                  className={buttonDangerClass}
                >
                  <span className="flex items-center gap-2">
                    <Trash2 size={14} /> Изтрий секцията
                  </span>
                </ConfirmSubmitButton>
              </form>
            </div>
          );
        })}

        <form action={addSection} className={`${cardClass} flex flex-col gap-4 border-dashed`}>
          <h3 className="font-body text-xs uppercase tracking-widest text-muted">Нова секция</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Заглавие</label>
              <input name="title" required className={inputClass} placeholder="Напр. Андреа" />
            </div>
            <div>
              <label className={labelClass}>Подзаглавие</label>
              <input name="subtitle" className={inputClass} placeholder="1 мин" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Тема</label>
              <input name="theme" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Цветове</label>
              <input name="colors" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Ред</label>
              <input name="order" type="number" defaultValue={project.sections.length} className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Съдържание</label>
            <textarea name="content" rows={4} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Видео (по избор)</label>
            <MediaUrlInput name="videoUrl" />
          </div>
          <button type="submit" className="btn-primary self-start">
            <Plus size={16} /> Добави секция
          </button>
        </form>
      </div>

      {/* Media */}
      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-sm font-black uppercase text-accent">
          Медия — начална страница (1 видео + 3 снимки)
        </h2>
        <MediaList items={previewMedia} projectId={project.id} />

        <form action={addMedia} className={`${cardClass} flex flex-col gap-4 border-dashed`}>
          <input type="hidden" name="placement" value="PREVIEW" />
          <AddMediaFields />
        </form>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-sm font-black uppercase text-accent">
          Медия — галерия в &quot;See more&quot; (concept art, скици, BTS)
        </h2>
        <MediaList items={galleryMedia} projectId={project.id} />

        <form action={addMedia} className={`${cardClass} flex flex-col gap-4 border-dashed`}>
          <input type="hidden" name="placement" value="GALLERY" />
          <AddMediaFields />
        </form>
      </div>
    </div>
  );
}

function AddMediaFields() {
  return (
    <>
      <h3 className="font-body text-xs uppercase tracking-widest text-muted">Добави медия</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Тип</label>
          <select name="type" className={inputClass} defaultValue="IMAGE">
            <option value="IMAGE">Снимка</option>
            <option value="VIDEO">Видео</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Ред</label>
          <input name="order" type="number" defaultValue={0} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Файл / URL</label>
        <MediaUrlInput name="url" />
      </div>
      <div>
        <label className={labelClass}>Надпис (по избор)</label>
        <input name="caption" className={inputClass} />
      </div>
      <button type="submit" className="btn-primary self-start">
        <Plus size={16} /> Добави
      </button>
    </>
  );
}

function MediaList({
  items,
  projectId,
}: {
  items: { id: string; type: string; url: string; caption: string; order: number }[];
  projectId: string;
}) {
  if (items.length === 0) {
    return <p className="font-body text-sm text-muted">Все още няма добавена медия.</p>;
  }
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => {
        const deleteMedia = deleteMediaAction.bind(null, item.id, projectId);
        return (
          <div
            key={item.id}
            className={`${cardClass} flex items-center justify-between gap-4 py-3`}
          >
            <div className="min-w-0">
              <p className="font-body text-xs uppercase tracking-widest text-accent-bright">
                {item.type === "VIDEO" ? "Видео" : "Снимка"} · ред {item.order}
              </p>
              <p className="truncate font-body text-sm text-white">
                {item.url || "(няма URL)"}
              </p>
              {item.caption && <p className="font-body text-xs text-muted">{item.caption}</p>}
            </div>
            <form action={deleteMedia}>
              <ConfirmSubmitButton
                confirmMessage="Изтриване на този елемент?"
                className="shrink-0 rounded-lg border border-red-500/40 p-2 text-red-400 transition-colors hover:bg-red-500 hover:text-white"
              >
                <Trash2 size={14} />
              </ConfirmSubmitButton>
            </form>
          </div>
        );
      })}
    </div>
  );
}
