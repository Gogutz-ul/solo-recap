import React, { useState } from "react";
import type { RecapData } from "../remotion/schema";
import { ACTIVITY_LABEL, SOLO_LOGO_URL, type Activity } from "../remotion/branding";

type Props = { initial: RecapData; onStart: (data: RecapData) => void };

const ACTIVITIES: Activity[] = ["driver", "it"];

export const RecapForm: React.FC<Props> = ({ initial, onStart }) => {
  const [name, setName] = useState(initial.name);
  const [activity, setActivity] = useState<Activity>(initial.activity);
  const [moneyIn, setMoneyIn] = useState(String(initial.moneyIn));
  const [moneyOut, setMoneyOut] = useState(String(initial.moneyOut));
  const [taxes, setTaxes] = useState(String(initial.taxes));
  const [prevIncome, setPrevIncome] = useState(String(initial.prevIncome));

  const num = (s: string) => Math.max(0, Number(s.replace(/[^\d]/g, "")) || 0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart({
      name: name.trim() || "SOLOprenor",
      year: initial.year,
      activity,
      moneyIn: num(moneyIn),
      moneyOut: num(moneyOut),
      taxes: num(taxes),
      prevIncome: num(prevIncome),
    });
  };

  return (
    <form className="form" onSubmit={submit}>
      <img className="form-logo" src={SOLO_LOGO_URL} alt="SOLO" />
      <h1 className="form-title">Recapul tău {initial.year}</h1>
      <p className="form-sub">Completează cifrele și vezi-ți anul ca o poveste.</p>

      <label className="field">
        <span>Numele tău</span>
        <input
          type="text"
          value={name}
          maxLength={24}
          onChange={(e) => setName(e.target.value)}
          placeholder="Andrei"
        />
      </label>

      <div className="field">
        <span>Activitatea ta</span>
        <div className="activity-grid">
          {ACTIVITIES.map((a) => (
            <button
              type="button"
              key={a}
              className={`activity-card ${activity === a ? "active" : ""}`}
              onClick={() => setActivity(a)}
            >
              {ACTIVITY_LABEL[a]}
            </button>
          ))}
        </div>
      </div>

      <label className="field">
        <span>Încasări în {initial.year} (lei)</span>
        <input inputMode="numeric" value={moneyIn} onChange={(e) => setMoneyIn(e.target.value)} placeholder="340000" />
      </label>

      <label className="field">
        <span>Cheltuieli (lei)</span>
        <input inputMode="numeric" value={moneyOut} onChange={(e) => setMoneyOut(e.target.value)} placeholder="45540" />
      </label>

      <label className="field">
        <span>Taxe și contribuții (lei)</span>
        <input inputMode="numeric" value={taxes} onChange={(e) => setTaxes(e.target.value)} placeholder="28600" />
      </label>

      <label className="field">
        <span>Venituri anul trecut (lei)</span>
        <input inputMode="numeric" value={prevIncome} onChange={(e) => setPrevIncome(e.target.value)} placeholder="250000" />
      </label>

      <button type="submit" className="btn-primary">
        Vezi recapul
        <span className="btn-arrow" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </span>
      </button>
    </form>
  );
};
