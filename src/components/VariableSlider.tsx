'use client';

type Props = {
  label: string;
  value: number;
  onChange: (val: number) => void;
};

export default function VariableSlider({ label, value, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}: <span className="font-bold text-blue-600">{value}</span>/100
      </label>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full accent-blue-500"
      />
    </div>
  );
}
