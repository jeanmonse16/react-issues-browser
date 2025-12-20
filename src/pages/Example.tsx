import { useState } from "react";
import FancyDropdown, { type Option } from "../components/Dropdown";

const sample: Option[] = [
  { value: "ny", label: "New York" },
  { value: "la", label: "Los Angeles" },
  { value: "sf", label: "San Francisco" },
  { value: "chi", label: "Chicago" },
  { value: "bos", label: "Boston", disabled: true },
  { value: "sea", label: "Seattle" },
];

export default () => {
  const [single, setSingle] = useState<string | null>(null);
  const [multi, setMulti] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8 text-white">
      <h2 className="mb-4">FancyDropdown (Tailwind) — Single (no filter)</h2>
      <FancyDropdown
        options={sample}
        value={single}
        onChange={(v) => setSingle(v as string | null)}
        placeholder="Choose a city"
        clearable
        id="city-single"
      />

      <div className="h-6" />

      <h2 className="mb-4">FancyDropdown (Tailwind) — Multiple (no filter)</h2>
      <FancyDropdown
        options={sample}
        value={multi}
        onChange={(v) => setMulti((v as string[]) ?? [])}
        placeholder="Pick one or more"
        multiple
        clearable
        id="city-multi"
      />
    </div>
  );
}