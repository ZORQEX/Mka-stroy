"use client"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { PROJECTS } from "@/constants/company"
import { translateWork } from "@/constants/worksI18n"
import { translateTitle, translateCity } from "@/constants/projectI18n"

const CATEGORIES = ["Все","аэропорт","производство","жилой","торговый","офисный","ритейл","спорт","общепит","развлечения"]
const LOCALES = ["ru","en","kk","de","ky","tr"]

// Map the Russian category values stored in the data to translation keys.
const CAT_KEY: Record<string, string> = {
  аэропорт: "airport", производство: "production", жилой: "residential", торговый: "commercial",
  офисный: "office", ритейл: "retail", спорт: "sport", общепит: "food", развлечения: "entertainment",
}

interface ProjectsProps {
  preview?: boolean
  dict?: any
}

export default function Projects({ preview = false, dict }: ProjectsProps) {
  const [active, setActive] = useState("Все")
  const [modal, setModal] = useState<typeof PROJECTS[0] | null>(null)
  const [imgIdx, setImgIdx] = useState(0)

  // Routes are locale-prefixed (/ru/projects). Derive the current locale from
  // the pathname so the "view all" link stays correct on every locale.
  const pathname = usePathname()
  const seg = pathname?.split("/")[1] ?? ""
  const locale = LOCALES.includes(seg) ? seg : "ru"

  // Translations (fall back to Russian if the dictionary is unavailable)
  const tp = dict?.projects ?? {}
  const tpCats = tp.categories ?? {}
  const tpModal = tp.modal ?? {}
  const catLabel = (c: string) => tpCats[CAT_KEY[c]] ?? c

  const filtered = preview
    ? PROJECTS.slice(0, 8)
    : (active === "Все" ? PROJECTS : PROJECTS.filter(p => p.category === active))

  return (
    <section id="projects" className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-text mb-3">{tp.title ?? "Наши проекты"}</h2>
        <p className="text-text-muted mb-8">{tp.count ?? "54 завершённых объекта в 5 странах"}</p>

        {/* Фильтры — только на странице /projects. На мобильном — горизонтальный скролл */}
        {!preview && (
          <div className="flex gap-2 mb-10 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`flex-shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                  active === cat
                    ? "bg-accent text-white"
                    : "bg-card text-text border border-border hover:bg-accent/10 hover:text-accent"
                }`}
              >
                {cat === "Все" ? `${tp.filterAll ?? "Все"} (${PROJECTS.length})` : catLabel(cat)}
              </button>
            ))}
          </div>
        )}

        {/* Сетка */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(project => (
            <div
              key={project.id}
              onClick={() => { setModal(project); setImgIdx(0) }}
              className="group cursor-pointer bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:border-accent transition-all duration-300"
            >
              <div className="relative h-48 sm:h-52 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.images[0]}
                  alt={translateTitle(project.title, locale)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-3 left-3 bg-accent text-white text-xs px-2 py-1 rounded-full capitalize">
                  {catLabel(project.category)}
                </span>
                {project.images.length > 1 && (
                  <span className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {project.images.length} {tpModal.photos ?? "фото"}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-text text-base leading-tight mb-1 line-clamp-2">
                  {translateTitle(project.title, locale)}
                </h3>
                <p className="text-text-muted text-sm mb-2">{translateCity(project.city, locale)}</p>
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>{project.date}</span>
                  {project.area && <span className="font-medium">{project.area}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка "Смотреть все" — только в режиме preview (на главной) */}
        {preview && (
          <div className="mt-10 text-center">
            <Link href={`/${locale}/projects`} className="btn btn-primary">
              {tp.viewAllProjects ?? "Смотреть все проекты"} →
            </Link>
          </div>
        )}
      </div>

      {/* Модальное окно */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Галерея */}
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={modal.images[imgIdx]}
                alt={modal.title}
                className="w-full h-64 sm:h-80 object-cover rounded-t-2xl"
              />
              {modal.images.length > 1 && (
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                  {modal.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === imgIdx ? "bg-white w-5" : "bg-white/50"}`}
                    />
                  ))}
                </div>
              )}
              {modal.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIdx(i => (i - 1 + modal.images.length) % modal.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white w-11 h-11 rounded-full flex items-center justify-center hover:bg-black/70"
                  >‹</button>
                  <button
                    onClick={() => setImgIdx(i => (i + 1) % modal.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white w-11 h-11 rounded-full flex items-center justify-center hover:bg-black/70"
                  >›</button>
                </>
              )}
              <button
                onClick={() => setModal(null)}
                className="absolute top-3 right-3 bg-black/50 text-white w-11 h-11 rounded-full flex items-center justify-center hover:bg-black/70 text-xl"
              >×</button>
            </div>

            {/* Детали */}
            <div className="p-6">
              <span className="inline-block bg-accent/10 text-accent text-xs px-3 py-1 rounded-full capitalize mb-3">
                {catLabel(modal.category)}
              </span>
              <h3 className="text-xl font-bold text-text mb-4">{translateTitle(modal.title, locale)}</h3>
              <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
                {modal.client && (
                  <div><p className="text-text-muted text-xs mb-0.5">{tpModal.client ?? "Клиент"}</p><p className="font-medium text-text">{modal.client}</p></div>
                )}
                <div><p className="text-text-muted text-xs mb-0.5">{tpModal.date ?? "Дата"}</p><p className="font-medium text-text">{modal.date}</p></div>
                {modal.area && (
                  <div><p className="text-text-muted text-xs mb-0.5">{tpModal.area ?? "Площадь"}</p><p className="font-medium text-text">{modal.area}</p></div>
                )}
                <div><p className="text-text-muted text-xs mb-0.5">{tpModal.city ?? "Город"}</p><p className="font-medium text-text">{translateCity(modal.city, locale)}</p></div>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-2">{tpModal.works ?? "Выполненные работы"}:</p>
                <ul className="space-y-1">
                  {modal.works.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text">
                      <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                      {translateWork(w, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
