'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { companyData } from '@/constants/company'
import type { Locale } from '@/i18n.config'
import type { Dictionary } from '@/lib/i18n'

export function Contacts({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { contacts, services } = companyData
  const f = (dict as any).contacts?.form ?? {}

  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Заявка с сайта — ${form.service || 'Услуга не выбрана'}`)
    const body = encodeURIComponent(
      `Имя: ${form.name}\nТелефон: ${form.phone}\nУслуга: ${form.service}\n\nСообщение:\n${form.message}`
    )
    // Static site: forward the request to the company inbox via the mail client.
    window.location.href = `mailto:${contacts.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section className="section bg-card" id="contacts">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">{dict.contacts.title}</h2>
              <p className="text-lg opacity-70 mb-10">{dict.contacts.subtitle}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-8"
            >
              <div>
                <p className="text-sm opacity-60 mb-2">{dict.contacts.address.label}</p>
                <p className="text-lg">
                  {(dict.contacts as any).addressFull ??
                    `РК, г. ${contacts.address.city}, ${contacts.address.district}, ${contacts.address.street}, ${contacts.address.building}`}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <p className="text-sm opacity-60 mb-2">{dict.contacts.phone.label}</p>
                  <a href={`tel:${contacts.phone.replace(/\D/g, '')}`} className="text-lg text-accent hover:underline">
                    {contacts.phone}
                  </a>
                </div>
                <div>
                  <p className="text-sm opacity-60 mb-2">{dict.contacts.email.label}</p>
                  <a href={`mailto:${contacts.email}`} className="text-lg text-accent hover:underline">
                    {contacts.email}
                  </a>
                </div>
              </div>

              <div>
                <p className="text-sm opacity-60 mb-2">{dict.contacts.schedule.label}</p>
                <p className="text-lg">{(dict.contacts as any).hours?.weekdays ?? contacts.workingHours.weekdays}</p>
                <p className="opacity-70">{(dict.contacts as any).hours?.weekend ?? contacts.workingHours.weekend}</p>
              </div>
            </motion.div>
          </div>

          {/* Request form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <div className="card p-6 sm:p-8">
              {sent ? (
                <div className="flex flex-col items-center text-center py-10">
                  <CheckCircle2 size={56} className="text-accent mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">{f.successTitle ?? 'Заявка отправлена'}</h3>
                  <p className="opacity-70 mb-6">{f.successText ?? 'Мы свяжемся с вами в ближайшее время.'}</p>
                  <button onClick={() => setSent(false)} className="btn btn-secondary">
                    {f.sendAnother ?? 'Отправить ещё одну'}
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-semibold mb-6">{f.title ?? 'Оставить заявку'}</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm opacity-70 mb-1.5">{f.name ?? 'Имя'}</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder={f.namePlaceholder ?? 'Ваше имя'}
                        className="w-full min-h-[44px] px-4 rounded-xl bg-bg border border-border text-text outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm opacity-70 mb-1.5">{f.phone ?? 'Телефон'}</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder={f.phonePlaceholder ?? '+7 (___) ___-__-__'}
                        className="w-full min-h-[44px] px-4 rounded-xl bg-bg border border-border text-text outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm opacity-70 mb-1.5">{f.service ?? 'Тип услуги'}</label>
                      <select
                        id="service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="w-full min-h-[44px] px-4 rounded-xl bg-bg border border-border text-text outline-none focus:border-accent transition-colors"
                      >
                        <option value="">{f.servicePlaceholder ?? 'Выберите услугу'}</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm opacity-70 mb-1.5">{f.message ?? 'Сообщение'}</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        placeholder={f.messagePlaceholder ?? 'Опишите ваш проект или вопрос'}
                        className="w-full px-4 py-3 rounded-xl bg-bg border border-border text-text outline-none focus:border-accent transition-colors resize-y"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                      {f.submit ?? 'Отправить заявку'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
