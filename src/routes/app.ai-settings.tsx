import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/app/ai-settings")({
  head: () => ({ meta: [{ title: "Настройки ИИ — PREKLEAD" }] }),
  component: AISettingsPage,
});

const TONES = [
  { id: "short", label: "Коротко и по делу" },
  { id: "professional", label: "Профессионально" },
  { id: "friendly", label: "Дружелюбно" },
];

function AISettingsPage() {
  const [businessName, setBusinessName] = useState("");
  const [businessDesc, setBusinessDesc] = useState("");
  const [tone, setTone] = useState("professional");
  const [rules, setRules] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [saved, setSaved] = useState(false);

  const generatePrompt = () => {
    const name = businessName || "Компания";
    const desc = businessDesc || "без описания";
    const toneLabel = TONES.find((t) => t.id === tone)?.label || "профессионально";
    const rulesText = rules || "без дополнительных правил";

    setGeneratedPrompt(
      `Ты AI ассистент компании "${name}".\n\n` +
      `О бизнесе: ${desc}\n\n` +
      `Стиль ответов: ${toneLabel}\n\n` +
      `Правила:\n${rulesText}\n\n` +
      `Отвечай клиентам кратко и по существу. Цель — увеличить продажи и помочь клиенту. Не используй лишних слов.`
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 md:p-10 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">Настройки ИИ</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Настройте как AI будет общаться с вашими клиентами
        </p>
      </div>

      <div className="space-y-5">
        {/* Business Name */}
        <div className="card p-5">
          <label className="label">Название бизнеса</label>
          <input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Например: Ресторан Доставка Еды"
            className="input-field"
          />
        </div>

        {/* Business Description */}
        <div className="card p-5">
          <label className="label">Описание бизнеса</label>
          <textarea
            value={businessDesc}
            onChange={(e) => setBusinessDesc(e.target.value)}
            placeholder="Опишите чем занимается ваш бизнес. Например: Мы ресторан доставки еды с собственной курьерской службой."
            rows={3}
            className="input-field resize-none"
          />
        </div>

        {/* Tone */}
        <div className="card p-5">
          <label className="label">Стиль ответов AI</label>
          <div className="flex flex-wrap gap-2">
            {TONES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                  tone === t.id
                    ? "bg-primary/10 border-primary/40 text-primary font-medium"
                    : "bg-surface border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rules */}
        <div className="card p-5">
          <label className="label">Правила для AI</label>
          <textarea
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            placeholder={`Примеры правил:
- Отвечай только по делу
- Предлагай услуги компании
- Задавай уточняющие вопросы
- Не пиши длинные сообщения`}
            rows={5}
            className="input-field resize-none font-mono text-xs"
          />
        </div>

        {/* Generate Prompt */}
        <button onClick={generatePrompt} className="btn btn-primary">
          Сгенерировать системный промпт
        </button>

        {/* Generated Prompt */}
        {generatedPrompt && (
          <div className="card p-5">
            <label className="label">Системный промпт (можно редактировать)</label>
            <textarea
              value={generatedPrompt}
              onChange={(e) => setGeneratedPrompt(e.target.value)}
              rows={10}
              className="input-field resize-none font-mono text-xs"
            />
          </div>
        )}

        {/* Save */}
        <div className="flex items-center gap-3 pt-2">
          <button onClick={handleSave} className="btn btn-primary">
            {saved ? "Сохранено" : "Сохранить настройки"}
          </button>
          {generatedPrompt && (
            <button onClick={() => navigator.clipboard?.writeText(generatedPrompt)} className="btn btn-secondary">
              Копировать промпт
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
