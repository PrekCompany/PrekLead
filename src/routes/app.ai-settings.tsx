import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkle, Brain, Globe, Question, ChatText, Check } from "../components/PhosphorIcons";

export const Route = createFileRoute("/app/ai-settings")({
  head: () => ({ meta: [{ title: "Настройки ИИ — PREKLEAD" }] }),
  component: AISettingsPage,
});

function AISettingsPage() {
  const [faqs, setFaqs] = useState([
    { q: "Сколько стоит Pro?", a: "Pro — $39/мес. Включает 10 000 AI-ответов." },
    { q: "Как подключить Telegram?", a: "Перейдите в Интеграции и нажмите Подключить." },
    { q: "Есть ли пробный период?", a: "Да, 7 дней бесплатно на любом тарифе." },
  ]);
  const [siteUrl, setSiteUrl] = useState("https://preklead.com");
  const [tone, setTone] = useState("professional");
  const [lang, setLang] = useState("ru");
  const [saved, setSaved] = useState(false);

  const tones = [
    { id: "professional", label: "Деловой" },
    { id: "friendly", label: "Дружелюбный" },
    { id: "casual", label: "Неформальный" },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 md:p-10 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-gradient">Настройки ИИ</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Обучите AI отвечать в стиле вашего бизнеса
        </p>
      </div>

      <div className="space-y-6">
        {/* Tone */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-9 rounded-xl bg-primary/15 grid place-items-center"><Brain size={16} className="text-primary" /></div>
            <div>
              <div className="text-sm font-semibold">Тон общения</div>
              <div className="text-xs text-muted-foreground">Как AI будет общаться с клиентами</div>
            </div>
          </div>
          <div className="flex gap-2">
            {tones.map((t) => (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  tone === t.id
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "bg-white/[0.03] text-muted-foreground border border-border/40 hover:text-foreground hover:bg-white/[0.06]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-9 rounded-xl bg-primary/15 grid place-items-center"><Globe size={16} className="text-primary" /></div>
            <div>
              <div className="text-sm font-semibold">Язык ответов</div>
              <div className="text-xs text-muted-foreground">Основной язык для генерации ответов</div>
            </div>
          </div>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white/[0.03] border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
            <option value="kk">Қазақ</option>
          </select>
        </div>

        {/* Site knowledge */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-9 rounded-xl bg-primary/15 grid place-items-center"><ChatText size={16} className="text-primary" /></div>
            <div>
              <div className="text-sm font-semibold">Обучение на сайте</div>
              <div className="text-xs text-muted-foreground">AI изучит содержимое вашего сайта</div>
            </div>
          </div>
          <input
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-2.5 text-sm bg-input/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
          />
          <button className="mt-3 px-4 py-2 rounded-lg bg-primary/15 text-primary text-sm font-medium hover:bg-primary/25 transition-all">
            Синхронизировать
          </button>
        </div>

        {/* FAQ */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-9 rounded-xl bg-primary/15 grid place-items-center"><Question size={16} className="text-primary" /></div>
            <div>
              <div className="text-sm font-semibold">Частые вопросы (FAQ)</div>
              <div className="text-xs text-muted-foreground">Обучите AI отвечать на типовые вопросы</div>
            </div>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/[0.03] border border-border/40 space-y-2">
                <input
                  value={faq.q}
                  onChange={(e) => {
                    const next = [...faqs];
                    next[i] = { ...next[i], q: e.target.value };
                    setFaqs(next);
                  }}
                  placeholder="Вопрос"
                  className="w-full px-3 py-1.5 text-sm bg-input/40 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
                <textarea
                  value={faq.a}
                  onChange={(e) => {
                    const next = [...faqs];
                    next[i] = { ...next[i], a: e.target.value };
                    setFaqs(next);
                  }}
                  placeholder="Ответ"
                  rows={2}
                  className="w-full px-3 py-1.5 text-sm bg-input/40 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none"
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => setFaqs((prev) => [...prev, { q: "", a: "" }])}
            className="mt-3 text-sm text-primary hover:text-primary-glow transition-colors"
          >
            + Добавить вопрос
          </button>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary-glow transition-all shadow-lg shadow-primary/20"
        >
          {saved ? (
            <>
              <Check size={16} /> Сохранено
            </>
          ) : (
            <>
              <Sparkle size={16} /> Сохранить настройки
            </>
          )}
        </button>
      </div>
    </div>
  );
}
