"use client";

import type { QualificationData } from "@/lib/handoff-console/types";
import { PRESETS } from "@/lib/handoff-console/presets";
import {
  Option,
  accountingSoftwareOptions,
  currentSolutionOptions,
  economicBuyerRoleOptions,
  fundingStageOptions,
  industryOptions,
  provinceOptions,
  revenueBandOptions,
  timelineOptions,
  topPainOptions,
  triStateOptions,
} from "./formOptions";

interface QualificationFormProps {
  data: QualificationData;
  onChange: (data: QualificationData) => void;
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="rc-field">
      <span className="rc-field-label">{label}</span>
      {children}
      {hint && <span className="rc-field-hint">{hint}</span>}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      className="rc-input"
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function NumberInput({
  value,
  onChange,
  min,
  max,
  placeholder,
}: {
  value: number | null;
  onChange: (v: number | null) => void;
  min?: number;
  max?: number;
  placeholder?: string;
}) {
  return (
    <input
      className="rc-input"
      type="number"
      min={min}
      max={max}
      value={value ?? ""}
      placeholder={placeholder ?? "Don't know"}
      onChange={(e) => {
        const raw = e.target.value;
        if (raw === "") {
          onChange(null);
          return;
        }
        const n = Number(raw);
        onChange(Number.isNaN(n) ? null : n);
      }}
    />
  );
}

function SelectInput<T extends string>({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: T | null;
  onChange: (v: T | null) => void;
  options: Option<T>[];
  placeholder?: string;
}) {
  return (
    <select
      className="rc-input rc-select"
      value={value ?? ""}
      onChange={(e) => onChange((e.target.value || null) as T | null)}
    >
      <option value="">{placeholder ?? "Don't know"}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function TriStateInput({
  value,
  onChange,
}: {
  value: boolean | null;
  onChange: (v: boolean | null) => void;
}) {
  const current = value === null ? "" : value ? "true" : "false";
  return (
    <select
      className="rc-input rc-select"
      value={current}
      onChange={(e) => {
        const v = e.target.value;
        onChange(v === "" ? null : v === "true");
      }}
    >
      {triStateOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default function QualificationForm({ data, onChange }: QualificationFormProps) {
  function set<K extends keyof QualificationData>(key: K, value: QualificationData[K]) {
    onChange({ ...data, [key]: value });
  }

  return (
    <div className="rc-form-shell">
      <div className="rc-presets">
        <span className="rc-presets-label">Load sample qualification sheet (fictional)</span>
        <div className="rc-presets-row">
          {PRESETS.map((preset) => (
            <button
              key={preset.companyName}
              type="button"
              className="rc-preset-btn"
              onClick={() => onChange({ ...preset })}
            >
              {preset.companyName}
            </button>
          ))}
        </div>
      </div>

      <fieldset className="rc-section">
        <legend className="rc-section-title">
          <span className="rc-section-n">01</span> Firmographic
        </legend>
        <div className="rc-grid">
          <Field label="Company name *">
            <TextInput
              value={data.companyName}
              onChange={(v) => set("companyName", v)}
              placeholder="Acme Inc."
            />
          </Field>
          <Field label="Website" hint="Used only for public-context lookup, never for the math">
            <TextInput
              value={data.website ?? ""}
              onChange={(v) => set("website", v === "" ? undefined : v)}
              placeholder="acme.com"
            />
          </Field>
          <Field label="Industry *">
            <select
              className="rc-input rc-select"
              value={data.industry}
              onChange={(e) => set("industry", e.target.value as QualificationData["industry"])}
            >
              {industryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="FTE count">
            <NumberInput value={data.fteCount} onChange={(v) => set("fteCount", v)} min={0} />
          </Field>
          <Field label="Revenue band">
            <SelectInput
              value={data.revenueBand}
              onChange={(v) => set("revenueBand", v)}
              options={revenueBandOptions}
            />
          </Field>
          <Field label="Funding stage">
            <SelectInput
              value={data.fundingStage}
              onChange={(v) => set("fundingStage", v)}
              options={fundingStageOptions}
            />
          </Field>
          <Field label="Province">
            <SelectInput
              value={data.province}
              onChange={(v) => set("province", v)}
              options={provinceOptions}
            />
          </Field>
          <Field label="Multi-entity?">
            <TriStateInput value={data.multiEntity} onChange={(v) => set("multiEntity", v)} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="rc-section">
        <legend className="rc-section-title">
          <span className="rc-section-n">02</span> Budget &amp; Current State
        </legend>
        <div className="rc-grid">
          <Field label="Current monthly spend (CAD)" hint="The single most important field">
            <NumberInput
              value={data.currentMonthlySpend}
              onChange={(v) => set("currentMonthlySpend", v)}
              min={0}
            />
          </Field>
          <Field label="# of cardholders">
            <NumberInput
              value={data.numCardholders}
              onChange={(v) => set("numCardholders", v)}
              min={0}
            />
          </Field>
          <Field label="Current solution">
            <SelectInput
              value={data.currentSolution}
              onChange={(v) => set("currentSolution", v)}
              options={currentSolutionOptions}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="rc-section">
        <legend className="rc-section-title">
          <span className="rc-section-n">03</span> Need
        </legend>
        <div className="rc-grid">
          <Field label="Top pain">
            <SelectInput
              value={data.topPain}
              onChange={(v) => set("topPain", v)}
              options={topPainOptions}
            />
          </Field>
          <Field label="Accounting software">
            <SelectInput
              value={data.accountingSoftware}
              onChange={(v) => set("accountingSoftware", v)}
              options={accountingSoftwareOptions}
            />
          </Field>
          <Field label="Close hours / month">
            <NumberInput
              value={data.closeHoursPerMonth}
              onChange={(v) => set("closeHoursPerMonth", v)}
              min={0}
            />
          </Field>
          <Field label="USD vendor share %" hint="Self-reported estimate">
            <NumberInput
              value={data.usdVendorSharePct}
              onChange={(v) => set("usdVendorSharePct", v)}
              min={0}
              max={100}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="rc-section">
        <legend className="rc-section-title">
          <span className="rc-section-n">04</span> Authority &amp; Timeline
        </legend>
        <div className="rc-grid">
          <Field label="Economic buyer role">
            <SelectInput
              value={data.economicBuyerRole}
              onChange={(v) => set("economicBuyerRole", v)}
              options={economicBuyerRoleOptions}
            />
          </Field>
          <Field label="Buyer engaged?">
            <TriStateInput value={data.buyerEngaged} onChange={(v) => set("buyerEngaged", v)} />
          </Field>
          <Field label="Timeline">
            <SelectInput
              value={data.timeline}
              onChange={(v) => set("timeline", v)}
              options={timelineOptions}
            />
          </Field>
          <Field label="Trigger event" hint="What made this come up now?">
            <TextInput
              value={data.triggerEvent ?? ""}
              onChange={(v) => set("triggerEvent", v === "" ? null : v)}
              placeholder="e.g. New controller hired last month"
            />
          </Field>
        </div>
      </fieldset>
    </div>
  );
}
