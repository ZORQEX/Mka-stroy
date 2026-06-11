"use client"
import { useState } from "react"
import { PROJECTS } from "@/constants/company"

const CATEGORIES = ["Все","аэропорт","производство","жилой","торговый","офисный","ритейл","спорт","общепит","развлечения"]

export default function Projects() {
  const [active, setActive] = useState("Все")
  const [modal, setModal] = useState<typeof PROJECTS[0] | null>(null)
  const [imgIdx, setImgIdx] = useState(0)

  const filtered = active === "Все" ? PROJECTS : PROJECTS.filter(p => p.category === active)

  return (
    <section id="projects" className="py-20 bg-[#F1F1F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#424242] mb-3">Наши проекты</h2>
        <p className="text-[#424242]/60 mb-8">54 завершённых объекта в 5 странах</p>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                active === cat
                  ? "bg-[#C0430B] text-white"
                  : "bg-white text-[#424242] hover:bg-[#C0430B]/10 border border-[#424242]/20"
              }`}
            >
              {cat === "Все" ? `Все (${PROJECTS.length})` : cat}
            </button>
          ))}
        </div>

        {/* Сетка */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(project => (
            <div
              key={project.id}
              onClick={() => { setModal(project); setImgIdx(0) }}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-52 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-3 left-3 bg-[#C0430B] text-white text-xs px-2 py-1 rounded-full capitalize">
                  {project.category}
                </span>
                {project.images.length > 1 && (
                  <span className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {project.images.length} фото
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#424242] text-base leading-tight mb-1 line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-[#424242]/50 text-sm mb-2">{project.city}</p>
                <div className="flex items-center justify-between text-xs text-[#424242]/60">
                  <span>{project.date}</span>
                  {project.area && <span className="font-medium">{project.area}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/70"
                  >‹</button>
                  <button
                    onClick={() => setImgIdx(i => (i + 1) % modal.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/70"
                  >›</button>
                </>
              )}
              <button
                onClick={() => setModal(null)}
                className="absolute top-3 right-3 bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/70 text-xl"
              >×</button>
            </div>

            {/* Детали */}
            <div className="p-6">
              <span className="inline-block bg-[#C0430B]/10 text-[#C0430B] text-xs px-3 py-1 rounded-full capitalize mb-3">
                {modal.category}
              </span>
              <h3 className="text-xl font-bold text-[#424242] mb-4">{modal.title}</h3>
              <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
                {modal.client && (
                  <div><p className="text-[#424242]/50 text-xs mb-0.5">Клиент</p><p className="font-medium text-[#424242]">{modal.client}</p></div>
                )}
                <div><p className="text-[#424242]/50 text-xs mb-0.5">Дата</p><p className="font-medium text-[#424242]">{modal.date}</p></div>
                {modal.area && (
                  <div><p className="text-[#424242]/50 text-xs mb-0.5">Площадь</p><p className="font-medium text-[#424242]">{modal.area}</p></div>
                )}
                <div><p className="text-[#424242]/50 text-xs mb-0.5">Город</p><p className="font-medium text-[#424242]">{modal.city}</p></div>
              </div>
              <div>
                <p className="text-xs text-[#424242]/50 mb-2">Выполненные работы:</p>
                <ul className="space-y-1">
                  {modal.works.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#424242]">
                      <span className="text-[#C0430B] mt-0.5 flex-shrink-0">✓</span>
                      {w}
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
